import { Editor } from "codemirror";
import * as prettier from 'prettier/standalone';
import * as markdown from 'prettier/parser-markdown';

module.exports = {
  default: function (_context: any) {
    const plugin = function (CodeMirror) {
      CodeMirror.defineExtension("formatNote", function () {
        const cm: Editor = this; // to get autocomplete working

        const cursor = cm.getCursor();

        const doc = cm.getDoc();
        const content = doc.getValue();

        const formatted = prettier.format(content, { parser: 'markdown', tabWidth: 2, plugins: [markdown] });

        const lines = content.split('\n')
        const lineCount = lines.length;
        const endLine = lines[lineCount - 1];

        // replace with prettier formatted text
        cm.replaceRange(formatted, { line: 0, ch: 0 }, { line: lineCount, ch: endLine.length }, content);
        // revert cursor to original position
        cm.setCursor(cursor);
      });
    };

    return {
      plugin: plugin,
    };
  },
};
