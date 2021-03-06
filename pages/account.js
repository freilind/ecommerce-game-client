import React, { useState, useEffect } from "react";
import { Icon } from "semantic-ui-react";
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";
import { getMeApi } from "../api/user";
import useAuth from "../hooks/useAuth";
import ChangeNameForm from "../components/Account/ChangeNameForm";
import ChangeEmailForm from "../components/Account/ChangeEmailForm";
import ChangePasswordForm from "../components/Account/ChangePasswordForm";
import BasicModal from "../components/Modal/BasicModal";
import AddressForm from "../components/Account/AddressForm";
import ListAddress from "../components/Account/ListAddress";

const Account = () => {
  const [user, setUser] = useState(undefined);
  const [userTest, setUserTest] = useState(false);
  const { auth, logout, setReloadUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response || null);
      setUserTest(response._id === "61c20d864951f76e0ef58d42");
    })();
  }, [auth]);

  if (user === undefined) return null;
  if (!auth && !user) {
    router.replace("/");
    return null;
  }

  return (
    <BasicLayout className="account">
      <Configuration
        userTest={userTest}
        user={user}
        logout={logout}
        setReloadUser={setReloadUser}
      />
      <Addresses userTest={userTest} />
    </BasicLayout>
  );
};

const Configuration = (props) => {
  const { userTest, user, logout, setReloadUser } = props;

  return (
    <div className="account__configuration">
      <div className="title">Configuration</div>
      <div className="data">
        <ChangeNameForm
          user={user}
          userTest={userTest}
          logout={logout}
          setReloadUser={setReloadUser}
        />
        {!userTest && (
          <>
            <ChangeEmailForm
              user={user}
              logout={logout}
              setReloadUser={setReloadUser}
            />
            <ChangePasswordForm user={user} logout={logout} />
          </>
        )}
      </div>
    </div>
  );
};

const Addresses = ({ userTest }) => {
  const [showModal, setShowModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [formModal, setFormModal] = useState(null);
  const [reloadAddreses, setReloadAddreses] = useState(false);

  const openModal = (title, address) => {
    setTitleModal(title);
    setFormModal(
      <AddressForm
        setShowModal={setShowModal}
        setReloadAddreses={setReloadAddreses}
        newAddress={address ? false : true}
        address={address || null}
      />
    );
    setShowModal(true);
  };

  return (
    <div className="account__addresses">
      <div className="title">
        Addresses
        <Icon name="plus" link onClick={() => openModal("New Address")} />
      </div>
      <div className="data">
        <ListAddress
          userTest={userTest}
          reloadAddreses={reloadAddreses}
          setReloadAddreses={setReloadAddreses}
          openModal={openModal}
        />
      </div>

      <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
        {formModal}
      </BasicModal>
    </div>
  );
};

export default Account;
