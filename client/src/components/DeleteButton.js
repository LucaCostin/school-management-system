import {Button, Confirm, Icon } from 'semantic-ui-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { deleteUser } from '../redux/userProvider';

export default function DeleteButton (userid){
    const [confirmDel, setConfirmDel] = useState(false);

    const userId = userid.userid;

    const dispatch = useDispatch();

    const deleteUserAction = (e) => {
      console.log(userId)
      if(window.confirm('Are you sure you want to delete this user?')) {
        dispatch(deleteUser({ userId, toast}));
      }
    }
    return (
        <>
            <Button as="div" floated='right' onClick= {deleteUserAction}>
                <Icon name="trash" />
                    Delete
            </Button>
            <Confirm
                open={confirmDel}
                onCancel={()=>setConfirmDel(false)}
                onConfirm={deleteUserAction}
            />
        </>
)
}
