import { JavaLineClassifierService } from '../services/line-classifier.service';

describe('JavaLineClassifierService', () => {
  let service: JavaLineClassifierService;

  beforeEach(() => {
    service = new JavaLineClassifierService();
  });

  it('should classify blank lines', () => {
    const line = '';
    expect(service.classifyLine(line)).toEqual('blank');
  });

  it('should classify single-line comments', () => {
    const line = '// This is a single-line comment';
    expect(service.classifyLine(line)).toEqual('comment');
  });

  it('should classify multiline comments', () => {
    const line1 = '/* This is the start of a multiline comment';
    const line2 = '   This is the continuation of the comment */';
    expect(service.classifyLine(line1)).toEqual('comment');
    expect(service.classifyLine(line2)).toEqual('comment');
  });

  it('should classify code lines', () => {
    const line = 'public class Main {';
    expect(service.classifyLine(line)).toEqual('code');
  });

  it('should correctly handle multiline comments spanning multiple lines', () => {
    const line1 = '/* This is the start of a multiline comment';
    const line2 = '   This is the continuation of the comment';
    const line3 = '   This is the end of the comment */';
    expect(service.classifyLine(line1)).toEqual('comment');
    expect(service.classifyLine(line2)).toEqual('comment');
    expect(service.classifyLine(line3)).toEqual('comment');
  });

  it('should correctly handle code lines within multiline comments', () => {
    const line1 = '/* This is the start of a multiline comment';
    const line2 = '   public class Main {';
    const line3 = '   This is the continuation of the comment */';
    expect(service.classifyLine(line1)).toEqual('comment');
    expect(service.classifyLine(line2)).toEqual('comment');
    expect(service.classifyLine(line3)).toEqual('comment');
  });
});
