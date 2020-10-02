import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Form from '../components/FormComponent'
import { getMemberDetail, unMountMemberDetail } from '../actions/dataAction'
import BackButton from '../components/elements/backButton'


const EditPage = () => {
    let { id } = useParams()
    const dispatch = useDispatch()
    const [mount, set] = useState(false)
    useEffect(() => {
        dispatch(getMemberDetail(id), set(true));
        dispatch(unMountMemberDetail(), set(false))
    }, [mount])
    // const [member, setstate] = useState(initialState)
    const member = useSelector(state => state.data.getMemberDetail)
    // console.log(member);
    return (
        <>
            <div className='mb-3'>
                <BackButton backClick={() => dispatch(unMountMemberDetail())} />
            </div>
            <h4>Edit Member</h4>
            {member ?
                <Form editUser member={member} />
                : null}
        </>
    )
}

export default EditPage

