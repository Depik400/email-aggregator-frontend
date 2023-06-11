import "./index.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import Protected from "../protected/Protected";
import { Context } from "../..";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import EmailPreview from "../../components/email-preview";
interface DD {
  id: number;
  message: string;
  who: string;
}

function EmailList({account, page}: {account: string|undefined, page: number| undefined}) {
  const { auth } = useContext(Context);
  const { isLoading, error, data } = useQuery<unknown, unknown, DD[]>(["email-list",account, page], () => {
    return new Promise((res) => {
      setTimeout(() => {
        res(
          Array.from({ length: 40 }, (_, i) => ({
            id: i as number,
            message: "Lorem ipsum",
            who: "noreplay@e-sfu.ru",
          })) as DD[]
        );
      }, 2000);
    });
  });
  if (isLoading) {
    return <div>загрузка</div>;
  }
  return (
    <ul className="mails-list">
      {data?.map((item) => (
        <EmailPreview item={item} key={item.id} />
      ))}
    </ul>
  );
}

function Sidebar() {
    return (
        <div className="sidebar">
            <button className="add-account">Добавить аккаунт</button>
            <button className="add-message">Написать письмо</button>
            <button className="account-action">Входящие</button>
            <button className="account-action">Помеченные</button>
            <button className="account-action">Отправленные</button>
            <button className="account-action">Черновики</button>
        </div>
    )
}

function InnerComponent() {
  const { auth } = useContext(Context);
  const [account, setAccount] = useState<string>();
  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    if (auth.isAuth) setAccount(auth.user?.accounts.at(0)?.email ?? "");
  }, []);

  function Accounts() {
    const { auth } = useContext(Context);
    return auth.user?.accounts.map((item) => (
      <div onClick={() => setAccount(item.email)} className={item.email === account ? "selected" : ""} key={item.email}>
        {item.email}
      </div>
    ));
  }
  return (
    <>
      <header className="header">
        <img src="logo_black.png" alt="" />
        <div className="group">
          <Link to="/account">
            <img src="account.svg" alt=""></img>
            <div>Аккаунт</div>
          </Link>
          <Link to="/settings">
            <img src="settings.svg" alt=""></img>
            <div>Настройки</div>
          </Link>
          <Link to="/logout">
            <img src="settings.svg" alt=""></img>
            <div>Выход</div>
          </Link>
        </div>
      </header>
      <main>
        <div className="grid-view">
          <div className="search"></div>
            <Sidebar></Sidebar>
          <div className="viwer">
            <div className="actions">Здесь типа активности</div>
            <div className="accounts">
                {Accounts()}
            </div>
            <div className="wrapper">
                <EmailList account={account} page={page}></EmailList>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function Component() {
  return (
    <Protected>
      <InnerComponent></InnerComponent>
    </Protected>
  );
}

export { Component };
