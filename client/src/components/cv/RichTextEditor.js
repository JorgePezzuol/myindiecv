import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../assets/wysig.css";
import { convertToHTML } from "draft-convert";

const RichTextEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [convertedContent, setConvertedContent] = useState(null);

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
    console.log(convertedContent);
  };
  return (
    <Editor
      editorState={editorState}
      onEditorStateChange={handleEditorChange}
      wrapperClassName="wrapper-class"
      editorClassName="editor-class"
      toolbarClassName="toolbar-class"
      toolbar={{
        options: ["inline", "list", "link"],
        inline: {
          options: ["bold", "italic", "underline", "strikethrough"],
        },
      }}
    />
  );
};

export default RichTextEditor;
