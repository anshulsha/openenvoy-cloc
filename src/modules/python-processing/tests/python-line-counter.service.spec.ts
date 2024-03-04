import { PythonLineClassifierService } from '../services/line-classifier.service';
import { PythonLineCounterService } from '../services/line-counter.service';

describe('PythonLineCounterService', () => {
  let service: PythonLineCounterService;

  beforeEach(() => {
    const lineClassifier = new PythonLineClassifierService();
    service = new PythonLineCounterService(lineClassifier);
  });

  it('should count blank lines', () => {
    const lines = ['', '', '', ''];
    const result = service.countLines(lines);
    expect(result.blankLines).toEqual(4);
    expect(result.commentLines).toEqual(0);
    expect(result.codeLines).toEqual(0);
  });

  it('should count single-line comments', () => {
    const lines = ['# This is a comment', '', '', ''];
    const result = service.countLines(lines);
    expect(result.blankLines).toEqual(3);
    expect(result.commentLines).toEqual(1);
    expect(result.codeLines).toEqual(0);
  });

  it('should count multiline comments', () => {
    const lines = [
      '""" This is a multiline comment',
      '    It spans multiple lines',
      '    This is the end of the comment """',
      '',
      '',
    ];
    const result = service.countLines(lines);
    expect(result.blankLines).toEqual(2);
    expect(result.commentLines).toEqual(3);
    expect(result.codeLines).toEqual(0);
  });

  it('should count code lines', () => {
    const lines = ['print("Hello, world!")', '', '', ''];
    const result = service.countLines(lines);
    expect(result.blankLines).toEqual(3);
    expect(result.commentLines).toEqual(0);
    expect(result.codeLines).toEqual(1);
  });

  it('should count mixed lines', () => {
    const lines = [
      '# This is a comment',
      '',
      'print("Hello, world!")',
      '',
      '""" This is a multiline comment',
      '    It spans multiple lines',
      '    This is the end of the comment """',
      '',
    ];
    const result = service.countLines(lines);
    expect(result.blankLines).toEqual(3);
    expect(result.commentLines).toEqual(4);
    expect(result.codeLines).toEqual(1);
  });
});
