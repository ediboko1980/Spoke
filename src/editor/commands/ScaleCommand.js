import Command from "./Command";
import { TransformSpace } from "../Editor2";

export default class ScaleCommand extends Command {
  constructor(editor, object, scale, space) {
    super(editor);
    this.object = object;
    this.scale = scale.clone();
    this.space = space;
    this.oldScale = object.scale.clone();
  }

  execute() {
    this.editor.scale(this.object, this.scale, this.space, false);
  }

  shouldUpdate(newCommand) {
    return this.object === newCommand.object && this.space === newCommand.space;
  }

  update(command) {
    this.editor.scale(this.object, command.scale, this.space, false);
  }

  undo() {
    this.editor.setScale(this.object, this.oldScale, TransformSpace.Local, false);
  }
}