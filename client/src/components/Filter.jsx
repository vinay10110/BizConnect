/* eslint-disable react/prop-types */
import { Drawer, Form, Input, Button, Cascader, Typography } from 'antd';
import { useState } from 'react';
import Categories from '../assets/Categories';
import Loans from '../assets/Loans';
import Proposals from '../assets/Proposals';
const { Title } = Typography;

const Filter = ({ visible, onClose, itemType, onFilter }) => {
  const [form] = Form.useForm();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [experience, setExperience] = useState(0);
  const [projectLife, setProjectLife] = useState(0);
  const [amount, setAmount] = useState(0);
  const [duration,setDuration]=useState(0);
  const [intrest,setIntrest]=useState(0);
  

  const handleCategoryChange = (value) => {
    setSelectedCategories(value);
  };

  const handleFinish = () => {
    let filterCriteria = {};

    switch (itemType) {
      case 'idea':
        filterCriteria = {
          category: selectedCategories,
          experience: experience,
          projectLife: projectLife,
        };
        break;
      case 'loan':
        filterCriteria = {
          category: selectedCategories,
          amount: amount,
          intrest:intrest,
          duration:duration
        };
        break;
      case 'proposal':
        filterCriteria = {
          category: selectedCategories,
          amount: amount,
          experience: experience,
        };
        break;
      default:
        break;
    }

    onFilter(filterCriteria);
    onClose();
  };

  const renderFilters = () => {
    switch (itemType) {
      case 'idea':
        return (
          <>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: 'Please select a category' }]}
            >
              <Cascader
                options={Categories}
                
                onChange={handleCategoryChange}
                placeholder="Select category"
                value={selectedCategories}
              />
            </Form.Item>
            <Form.Item
              label="Experience"
              name="experience"
              rules={[{ message: 'Please enter experience' }]}
            >
              <Input
              type='number'
                placeholder="Enter experience (years)"
                value={experience}
                onChange={ev => setExperience(ev.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Project Lifetime"
              name="projectLife"
              rules={[{ message: 'Please enter project lifetime' }]}
            >
              <Input
              type='number'
                placeholder="Enter project lifetime (years)"
                value={projectLife}
                onChange={ev => setProjectLife(ev.target.value)}
              />
            </Form.Item>
          </>
        );
      case 'loan':
        return (
          <>
            <Form.Item
              label="Loan Type"
              name="loanType"
              rules={[{ required: true, message: 'Please enter loan type' }]}
            >
              <Cascader
                options={Loans}
                onChange={handleCategoryChange}
                placeholder="Select category"
                value={selectedCategories}
              />
            </Form.Item>
            <Form.Item
              label="Amount"
              name="amount"
            >
              <Input type='number'
                placeholder="Enter loan amount"
                value={amount}
                onChange={ev => setAmount(ev.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Intrest Rate"
              name="intrestRate"
            >
              <Input type='number'
                placeholder="Enter Intrest rate"
                value={intrest}
                onChange={ev => setIntrest(ev.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Duration"
              name="duration"
            >
              <Input type='number'
                placeholder="Enter loan duration"
                value={duration}
                onChange={ev => setDuration(ev.target.value)}
              />
            </Form.Item>
            
          </>
        );
      case 'proposal':
        return (
          <>
            <Form.Item
              label="Proposal Type"
              name="proposalType"
              rules={[{ required: true, message: 'Please enter proposal type' }]}
            >
              <Cascader
                options={Proposals}
                onChange={handleCategoryChange}
                placeholder="Select category"
                value={selectedCategories}
              />
            </Form.Item>
            <Form.Item
              label="Amount"
              name="amount"
            >
              <Input
              type='number'
                placeholder="Enter amount"
                value={amount}
                onChange={ev => setAmount(ev.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Experience"
              name="experience"
            >
              <Input
                type='number'
                placeholder="Enter experience"
                value={experience}
                onChange={event => setExperience(event.target.value)}
              />
            </Form.Item>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Drawer
      title={<Title level={3}>Filter {itemType}</Title>}
      placement="right"
      onClose={onClose}
      visible={visible}
      width={400}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        {renderFilters()}

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>
            Apply
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default Filter;
