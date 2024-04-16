import Header from "../components/Layout/Header";
import React, { useState, useEffect } from "react";
import { Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import Spinner from "./../components/Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";


const { RangePicker } = DatePicker;

const HomePage = () => {

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);



  
  //table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Refrence",
      dataIndex: "refrence",
    },
    {
      title:"Description",
      dataIndex:"description",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div className="flex ">
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            style={{color:"red"}}
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];

  //getall transactions

  //useEffect Hook
  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/transections/get-transection`, {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        });
        setAllTransection(res.data);
        setLoading(false);
      } catch (error) {
        message.error("Fetch Issue With Tranction");
      }
    };
    getAllTransactions();
  }, [frequency, selectedDate, type, setAllTransection]);

  //delete handler
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_BASE_URL}/transections/delete-transection`, {
        transacationId: record._id,
      });
      setAllTransection((prev)=>(prev.filter((prev)=>prev._id!==record._id)));
      setLoading(false);
      message.success("Transaction Deleted!");
    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("unable to delete");
    }
  };

  // form handling
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      
      if (editable) {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/transections/edit-transection`, {
          payload: {
            ...values,
            userId: user._id,
          },
          transacationId: editable._id,
        });
       
        setLoading(false);
        message.success("Transaction Updated Successfully");
      } else {
        setAllTransection((prev)=>([...prev,values]));
        await axios.post(`${process.env.REACT_APP_BASE_URL}/transections/add-transection`, {
          ...values,
          userid: user._id,
        });
        setLoading(false);
        message.success("Transaction Added Successfully");
      }
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("please fill all fields");
    }
  };


  return (
    <div className=" w-full h-screen lg:overflow-x-hidden scroll-smooth mb-[40px]">
     
      <Header/>
        
      <div className="filters gap-2">
        <div>
              
         
        <h6 >Select Frequency</h6>

          <Select className="" value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">LAST 1 Week</Select.Option>
            <Select.Option value="30">LAST 1 Month</Select.Option>
            <Select.Option value="365">LAST 1 year</Select.Option>
            <Select.Option value="custom">custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedate(values)}
            />
          )}
        </div>
        <div className="filter-tab flex flex-col flex-wrap">
          <h6>Select Type</h6>
          <Select  value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">ALL</Select.Option>
            <Select.Option value="income">INCOME</Select.Option>
            <Select.Option value="expense">EXPENSE</Select.Option>
          </Select>
        </div>
        <div className="flex flex-col gap-4 md:flex-row lg:flex-row sm:flex-row">
          <div className="switch-icons">
            <UnorderedListOutlined
              className={`mx-2 ${
                viewData === "table" ? "active-icon" : "inactive-icon"
              }`}
              onClick={() => setViewData("table")}
            />
            <AreaChartOutlined
              className={`mx-2 ${
                viewData === "analytics" ? "active-icon" : "inactive-icon"
              }`}
              onClick={() => setViewData("analytics")}
            />
          </div>
          <div className="max-w-32 items-center justify-center flex border-2 border-sky-500 shadow-lg hover:bg-sky-500 text-sky-500 hover:text-white duration-300 cursor-pointer active:scale-[0.98]">
            <button
              className="px-3 py-2 font-bold"
              onClick={() => setShowModal(true)}
            >
              Add New
            </button>
          </div>
        </div>
      </div>
      {
        loading ? (<Spinner pad={'pb-60'} top={'top-[30%]'}/> ) : (

       <div>
      <div className="content">
        {viewData === "table" ? (
          <Table columns={columns} dataSource={allTransection} className=" overflow-x-scroll  md:overflow-x-hidden lg:overflow-x-hidden lg:pl-8 "/>
        ) : (
          <Analytics allTransection={allTransection} />
          )}
      </div>
      <Modal
        title={editable ? "Edit Transaction" : "Add Transection"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editable}
        >
          <Form.Item label="Amount" name="amount" required>
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="type" name="type" required>
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category" required>
            <Select>
              <Select.Option value="salary">Salary</Select.Option>
              <Select.Option value="tip">Tip</Select.Option>
              <Select.Option value="project">Project</Select.Option>
              <Select.Option value="food">Food</Select.Option>
              <Select.Option value="movie">Movie</Select.Option>
              <Select.Option value="bills">Bills</Select.Option>
              <Select.Option value="medical">Medical</Select.Option>
              <Select.Option value="fee">Fee</Select.Option>
              <Select.Option value="tax">TAX</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date" required>
            <Input type="date" required />
          </Form.Item>
          <Form.Item label="Refrence" name="refrence" required>
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Description" name="description" required>
            <Input type="text" required />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              {" "}
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
      </div>)}
          
  
      {/* </div> */}

      {/* <Footer/> */}
      
    </div>
  );
};

export default HomePage;
