export interface LineClassifier {
  classifyLine(line: string): 'blank' | 'comment' | 'code';
}
