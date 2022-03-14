import { Table, Tag, Space,Button } from 'antd';

import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pupilJsonDatas } from "../redux/pupil/actionCreator";
import { getAllWords } from "../redux/words/actionCreator";
import actions from "../redux/pupil/actions";


//Layouts
import MainLayout from '../components/layouts/MainLayout'


const columns = [
    {
      title: 'English',
      dataIndex: 'eng',
      key: 'eng'
    },
    {
      title: 'Монгол',
      dataIndex: 'mon',
      key: 'mon',
    },
    {
      title: 'Comment',
      dataIndex: 'comm',
      key: 'comm',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <a>Edit {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];



function words() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.words.list);
  
   
  
    useEffect(() => {
      dispatch(getAllWords());
    }, []);




  return (
    <MainLayout>
    <Space>
    <Button>Үг нэмэх</Button>
    </Space>
    <Table columns={columns} dataSource={data} />
    
    </MainLayout>
  )
}

export default words

