export interface FileInputProps {
  ref: any;
  importFile(event: React.ChangeEvent<HTMLInputElement>): any;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
