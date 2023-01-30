import React, { Fragment, useEffect, useState } from "react";
import MessengerCustomerChat from "react-messenger-customer-chat";
import MessengerDataService from "../services/messenger.service";

const MessengerChat = () => {
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await MessengerDataService.get().then((res) => {
        setInfo(res.data);
        setLoading(false);
      });
    })();
  }, []);

  return (
    <Fragment>
      {!loading && Object.keys(info).length > 0 && (
        <MessengerCustomerChat pageId={info.page_id} appId={info.app_id} />
      )}
    </Fragment>
  );
};

export default MessengerChat;
