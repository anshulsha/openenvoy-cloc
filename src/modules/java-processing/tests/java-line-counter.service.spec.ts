import { JavaLineClassifierService } from '../services/line-classifier.service';
import { JavaLineCounterService } from '../services/line-counter.service';

describe('JavaLineCounterService', () => {
  let service: JavaLineCounterService;
  let classifierService: JavaLineClassifierService;

  beforeEach(() => {
    classifierService = new JavaLineClassifierService();
    service = new JavaLineCounterService(classifierService);
  });

  it('should count blank lines', () => {
    const lines = ['', '', ''];
    const result = service.countLines(lines);
    expect(result.blankLines).toEqual(3);
    expect(result.commentLines).toEqual(0);
    expect(result.codeLines).toEqual(0);
  });

  it('should count single-line comments', () => {
    const lines = ['// This is a comment', '', '// Another comment'];
    const result = service.countLines(lines);
    expect(result.blankLines).toEqual(1);
    expect(result.commentLines).toEqual(2);
    expect(result.codeLines).toEqual(0);
  });

  it('should count multiline comments', () => {
    const lines = [
      '/* This is the start of a multiline comment',
      '   This is the continuation of the comment',
      '   This is the end of the comment */',
    ];
    const result = service.countLines(lines);
    expect(result.blankLines).toEqual(0);
    expect(result.commentLines).toEqual(3);
    expect(result.codeLines).toEqual(0);
  });

  it('should count code lines', () => {
    const lines = [
      'public class Main {',
      '  public static void main(String[] args) {',
      '    System.out.println("Hello, world!");',
      '  }',
      '}',
    ];
    const result = service.countLines(lines);
    expect(result.blankLines).toEqual(0);
    expect(result.commentLines).toEqual(0);
    expect(result.codeLines).toEqual(5);
  });
});
