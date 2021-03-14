import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../assets/wysig.css";
import { convertToHTML } from "draft-convert";

const RichTextEditor = ({ object, setObject }) => {
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(
      ContentState.createFromBlockArray(
        convertFromHTML(
          object ? object.description : "<p>Overall experience</p>"
        )
      )
    )
  );

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setObject({
      ...object,
      description: currentContentAsHTML,
    });
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
