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
          <p>Category: {item.category[item.category.length-1]}</p>
          <p>Company Registration: {item.companyReg}</p>
          <p>Project Life: {item.projectLife} years</p>
          <p>Experience: {item.experience} years</p>
          <p>Skill Set: {item.skillSet}</p>
          <p>Description: {item.description}</p>
        </>
      );
    }
    if (itemType === 'loan') {
      return (
        <>
          <p>Min Age: {item.minAge} years</p>
          <p>Max Age: {item.maxAge} years</p>
          <p>Net Income: {item.netIncome} .Rs</p>
          <p>Interest Rate: {item.intrestRate}.Rs</p>
          <p>Duration: {item.duration} years</p>
        </>
      );
    }
    if (itemType === 'proposal') {
      return (
        <>
          <p>Investment Category: {item.investmentType[item.investmentType.length-2]}</p>
          <p>Expected Revenue: {item.expectedRevenue}.Rs</p>
          <p>Amount: {item.amount}.Rs</p>
          <p>Skills Set: {item.skillSet}</p>
          <p>Experience: {item.experience} years</p>
          <p>Description: {item.description}</p>
        </>
      );
    }
    if (itemType === 'solution') {

      return (
        <>
          <p>Query: {item.query.description}</p>
          <p>Solution :{item.description}</p>
        </>
      );
    }
    if(itemType==='query'){
      return (
        <>
        <p>Category: {item.category}</p>
        <p>Description: {item.description}</p>
        </>
      )
    }
  };

  return (
    <Drawer
      title={itemType === 'idea' ? item.title : itemType === 'loan' ? item.loanType[item.loanType.length-1] : itemType === 'proposal'? item.investmentType[item.investmentType.length-1]: 'solution'}
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
