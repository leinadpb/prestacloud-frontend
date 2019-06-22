import React from 'react';
import { notification, Icon } from 'antd';

const openNotification = (data) => {
  console.log(data);
  notification.open({
    message: data.title,
    description: data.message,
    icon: <Icon type="success" style={{ color: '#cc0047' }} />,
  });
};

const withNotifier = (WrappedComponent) => {
  return class Wrapped extends React.Component {
    render() {
      return (
        <WrappedComponent {...this.props} notify={(data) => openNotification(data)}  />
      );
    }
  }
}

export default withNotifier;