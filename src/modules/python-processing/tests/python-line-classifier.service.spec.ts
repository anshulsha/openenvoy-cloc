import { PythonLineClassifierService } from '../services/line-classifier.service';

describe('PythonLineClassifierService', () => {
  let service: PythonLineClassifierService;

  beforeEach(() => {
    service = new PythonLineClassifierService();
  });

  it('should classify blank lines', () => {
    const line = '';
    expect(service.classifyLine(line)).toEqual('blank');
  });

  it('should classify single-line comments', () => {
    const line = '# This is a comment';
    expect(service.classifyLine(line)).toEqual('comment');
  });

  it('should classify multiline comments', () => {
    const line1 = '""" This is a multiline comment';
    const line2 = '   It spans multiple lines';
    const line3 = '   This is the end of the comment """';
    expect(service.classifyLine(line1)).toEqual('comment');
    expect(service.classifyLine(line2)).toEqual('comment');
    expect(service.classifyLine(line3)).toEqual('comment');
  });

  it('should classify code lines', () => {
    const line = 'print("Hello, world!")';
    expect(service.classifyLine(line)).toEqual('code');
  });

  it('should correctly handle multiline strings', () => {
    const line1 = '""" This is a multiline string';
    const line2 = '   It spans multiple lines';
    const line3 = '   This is the end of the string """';
    expect(service.classifyLine(line1)).toEqual('comment');
    expect(service.classifyLine(line2)).toEqual('comment');
    expect(service.classifyLine(line3)).toEqual('comment');
  });

  it('should correctly handle code lines within multiline strings', () => {
    const line1 = '""" This is a multiline string';
    const line2 = '   print("This line is part of the string")';
    const line3 = '   This is the end of the string """';
    expect(service.classifyLine(line1)).toEqual('comment');
    expect(service.classifyLine(line2)).toEqual('comment');
    expect(service.classifyLine(line3)).toEqual('comment');
  });
});
