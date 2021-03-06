import React, { useState, useEffect } from "react";
import { Grid, Button } from "semantic-ui-react";
import { map, size } from "lodash";
import { getAddressesApi, deleteAddressApi } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";

const ListAddress = (props) => {
  const { userTest, reloadAddreses, setReloadAddreses, openModal } = props;
  const [addresses, setAddresses] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getAddressesApi(auth.idUser, logout);
      setAddresses(response || []);
      setReloadAddreses(false);
    })();
  }, [reloadAddreses]);

  if (!addresses) return null;

  return (
    <div className="list-address">
      {size(addresses) === 0 ? (
        <h3>Without address.</h3>
      ) : (
        <Grid>
          {map(addresses, (address) => (
            <Grid.Column key={address.id} mobile={16} tablet={16} computer={16}>
              <Address
                userTest={userTest}
                address={address}
                logout={logout}
                setReloadAddreses={setReloadAddreses}
                openModal={openModal}
              />
            </Grid.Column>
          ))}
        </Grid>
      )}
    </div>
  );
};

const Address = (props) => {
  const { userTest, address, logout, setReloadAddreses, openModal } = props;
  const [loadingDelete, setLoadingDelete] = useState(false);

  const deleteAddress = async () => {
    setLoadingDelete(true);
    const response = await deleteAddressApi(address._id, logout);
    if (response) setReloadAddreses(true);
    setLoadingDelete(false);
  };

  return (
    <div className="address">
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.state}, {address.city} {address.postalCode}
      </p>
      <p>{address.phone}</p>

      <div className="actions">
        <Button
          primary
          disabled={userTest}
          onClick={() => openModal(`Edit: ${address.title}`, address)}
        >
          Edit
        </Button>
        <Button
          disabled={userTest}
          onClick={deleteAddress}
          loading={loadingDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ListAddress;
