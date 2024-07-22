/* eslint-disable react/prop-types */
import { Drawer } from 'antd';

const DetailsDrawer = ({ visible, onClose, itemType, item }) => {
  if (!item) {
    return null;
  }

  const renderContent = () => {
    if (itemType === 'idea') {
      return (
        <>
          <p>Category: {item.category}</p>
          <p>Company Registration: {item.companyReg}</p>
          <p>Project Life: {item.projectLife}</p>
          <p>Experience: {item.experience}</p>
          <p>Skill Set: {item.skillSet}</p>
          <p>Description: {item.description}</p>
        </>
      );
    }
    if (itemType === 'loan') {
      return (
        <>
          <p>Min Age: {item.minAge}</p>
          <p>Max Age: {item.maxAge}</p>
          <p>Net Income: {item.netIncome}</p>
          <p>Interest Rate: {item.intrestRate}</p>
          <p>Duration: {item.duration}</p>
        </>
      );
    }
    if (itemType === 'proposal') {
      return (
        <>
          <p>Investment Category: {item.investmentCategory}</p>
          <p>Expected Revenue: {item.expectedRevenue}</p>
          <p>Amount: {item.amount}</p>
          <p>Skills Set: {item.skillSet}</p>
          <p>Experience: {item.experience}</p>
        </>
      );
    }
  };

  return (
    <Drawer
      title={itemType === 'idea' ? item.title : itemType === 'loan' ? item.loanType : item.investmentType}
      width={640}
      placement="right"
      onClose={onClose}
      visible={visible}
    >
      {renderContent()}
    </Drawer>
  );
};

export default DetailsDrawer;
