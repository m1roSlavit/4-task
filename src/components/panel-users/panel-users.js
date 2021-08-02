import React, {createRef, useEffect} from 'react';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock, faLockOpen, faTrashAlt} from "@fortawesome/free-solid-svg-icons";

import './panel-users.scss';
import userService from "../../services/usersService";
import {useActions} from "../../hooks/useActions";
import {useSelector} from "react-redux";
import Spinner from "../spinner";

const usersData = [
  {
    id: 1,
    name: 'Mark',
    email: 'Mark@mdo.com',
    registrationDate: '12.11.20',
    lastSignIn: '12.07.21',
    status: 'Blocked',
  },
  {
    id: 2,
    name: 'Jacob',
    email: 'Jacob@fat.com',
    registrationDate: '11.06.19',
    lastSignIn: '23.07.21',
    status: 'Blocked',
  },
  {
    id: 3,
    name: 'Ivan',
    email: 'Ivan@twitter.com',
    registrationDate: '06.09.21',
    lastSignIn: '08.04.21',
    status: 'Active',
  }
];

const PanelUsers = () => {
  const {fetchUsers} = useActions();
  const {usersList} = useSelector(state => state.users);
  const {usersAction} = useSelector(state => state.users);
  const {users, loading, error} = usersList;
  const userCheckboxes = new Array(users.length).fill(null).map(_ => createRef());
  const {fetchUsersAction} = useActions();

  const renderUserTr = ((user, ref) => {
    const {
      id, name, email,
      createdAt,
      logginedAt, status
    } = user;

    return (
      <tr key={id}>
        <th>
          <input type="checkbox"
                 name="userCheckboxes"
                 ref={ref}
                 value={id}
          />
        </th>
        <td>{id}</td>
        <td>{name}</td>
        <td>{email}</td>
        <td>{createdAt}</td>
        <td>{logginedAt}</td>
        <td>{status}</td>
      </tr>
    );
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const onCheckUsers = (e) => {
    const checkboxNewStatus = e.target.checked;
    userCheckboxes.forEach(checkbox => {
      if (checkbox.current.checked !== checkboxNewStatus) {
        checkbox.current.click();
      }
    });
  };

  const onPanelUsersSubmit = (e) => {
    e.preventDefault();
    const actionType = e.nativeEvent.submitter.getAttribute('data-action');
    const actionTargetUsersId = [];
    userCheckboxes.forEach(userCheckbox => {
      if (userCheckbox.current.checked)
        actionTargetUsersId.push(userCheckbox.current.value);
    });
    if (actionTargetUsersId.length === 0)
      return;

    fetchUsersAction(actionTargetUsersId, actionType);
    console.log(actionType, actionTargetUsersId);
  }

  if (loading) {
    return <Spinner />
  }

  if (error) {
    return (
      <div className="invalid-feedback d-block">
        {error}
      </div>
    );
  }

  const formControlRender = () => {
    if (usersAction.loading) {
      return <Spinner />
    }
    if (usersAction.error) {
      return (
        <div className="invalid-feedback d-block">
          {error}
        </div>
      );
    }
    return (
      <div>
        <div className="actions-toolbar btn-group" role="group" aria-label="Basic mixed styles example">
          <button type="submit" className="btn btn-success" data-action="unblock">
            <FontAwesomeIcon icon={faLockOpen} color="white" />
          </button>
          <button type="submit" className="btn btn-warning" data-action="block">
            <FontAwesomeIcon icon={faLock} color="white" />
          </button>
          <button type="submit" className="btn btn-danger" data-action="delete">
            <FontAwesomeIcon icon={faTrashAlt} color="white" />
          </button>
        </div>
        {
          usersAction.done ? (
            <div className="valid-feedback d-block">
              Success
            </div>
          ) : null
        }
      </div>
    );
  }

  return (
    <div className="panel-users">
      <form onSubmit={onPanelUsersSubmit}>
        {
          formControlRender()
        }
        <table className="table">
          <thead>
          <tr>
            <th scope="col"><input type="checkbox" onChange={onCheckUsers}/></th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Registration date</th>
            <th scope="col">Last sign in</th>
            <th scope="col">Status</th>
          </tr>
          </thead>
          <tbody>
          {
            users.map((user, idx) => renderUserTr(user, userCheckboxes[idx]))
          }
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default PanelUsers;