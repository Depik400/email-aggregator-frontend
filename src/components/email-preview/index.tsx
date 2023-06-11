import "./index.scss";
import { IEmailPreview } from "../../api/EmailRepository";

interface IEmailView {
  item: IEmailPreview;
}

function EmailPreview({ item }: IEmailView) {
  return (
    <div className="email-preview">
      <input type="checkbox" name="" id="" className="email-preview__selector" />
      <div className="email-preview__who">{item.who}</div>
      <div className="email-preview-text">{item.message}</div>
    </div>
  );
}

export default EmailPreview;
