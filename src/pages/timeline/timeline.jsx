import React, {useEffect} from 'react';
import "./timeline.css";
import Navbar from '../../components/navbar/navbar';
import Leftbar from '../../components/leftbar/Leftbar';
import Middlebar from '../../components/middlebar/Middlebar';
import Rightbar from '../../components/rightbar/Rightbar';


export default function Timeline() {
  
  useEffect(()=>{
    window.scrollTo(0, 0);
    window.scroll({behavior: "smooth"})
  },[])
  return <div className="timeline">
       <Navbar />
       <div className="body">
       <Leftbar />
       <Middlebar />
       <Rightbar />
       </div>
    </div>;
}
