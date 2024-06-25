import axios from 'axios';
import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import GetComments from '../AnswersAndComments/GetComments';
import { PROJECT_ID } from '../Utils/Constant';

const PostDetails = () => {
  const params=useParams();
  console.log(params)
  const [data,setData]=useState({});
  const fetchData = async () => {
    const token=localStorage.getItem('token');
    const headers = {
        'projectID': PROJECT_ID,
        'Authorization': `Bearer ${token}`
    };

    try {
        const response = await axios.get(`https://academics.newtonschool.co/api/v1/quora/post/${params.id}`, { headers });
        setData(response.data);
        console.log(response.data)
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

useEffect(() => {
    fetchData();
}, []);
  
  return (
    <div className='p-52'>
      Post Details
      <GetComments />
    </div>
    
  )
}

export default PostDetails