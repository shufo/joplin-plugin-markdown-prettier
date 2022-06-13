import joplin from "api";
import { ContentScriptType, MenuItemLocation, ToolbarButtonLocation } from "api/types";

joplin.plugins.register({
  onStart: async function () {
    joplin.contentScripts.register(ContentScriptType.CodeMirrorPlugin, "formatter", "./formatter.js");
    joplin.commands.register({
      name: 'formatNote',
      label: 'Format Note',
      iconName: 'fas fa-code',
      enabledCondition: "markdownEditorVisible",
      execute: async () => {
        await joplin.commands.execute('editor.execCommand', { name: 'formatNote', });
      }
    });
    await joplin.views.menuItems.create('prettyMarkdown', 'formatNote', MenuItemLocation.Edit, { accelerator: 'Alt+Shift+F' });
    await joplin.views.toolbarButtons.create(
      "prettier-markdown",
      "formatNote",
      ToolbarButtonLocation.EditorToolbar
    );
    await joplin.views.menuItems.create("Format Note", "formatNote", MenuItemLocation.EditorContextMenu);
  },
});
