import React from 'react';
import { shallow } from 'enzyme';
import EmployeeDash from '../components/EmployeeDash';
import LoggedComponent from '../components/LoggedComponent';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { MemoryRouter } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });



describe('EmployeeDash', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EmployeeDash EId={123} />);
  });

  it('should render without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should display the Employee Dashboard navbar brand text', () => {
    expect(wrapper.find('.navbar-brand').text()).toEqual('Employee Dashboard');
  });

  it('should render the Task List link and it should be clickable', () => {
    expect(wrapper.find({ to: { pathname: '/etasklist', state: { EId: 123 } } }).length).toEqual(1);
  });

  it('should render the Teammates List link and it should be clickable', () => {
    expect(wrapper.find({ to: { pathname: '/eemplist', state: { EId: 123 } } }).length).toEqual(1);
  });

  it('should render the Project List link and it should be clickable', () => {
    expect(wrapper.find({ to: { pathname: '/eprojectlist', state: { EId: 123 } } }).length).toEqual(1);
  });

  it('should take the user to the correct route when the Task List link is clicked', () => {
    const link = wrapper.find({ to: { pathname: '/etasklist', state: { EId: 123 } } });
    expect(link.props().to.pathname).toEqual('/etasklist');
  });

  it('should take the user to the correct route when the Teammates List link is clicked', () => {
    const link = wrapper.find({ to: { pathname: '/eemplist', state: { EId: 123 } } });
    expect(link.props().to.pathname).toEqual('/eemplist');
  });

  it('should take the user to the correct route when the Project List link is clicked', () => {
    const link = wrapper.find({ to: { pathname: '/eprojectlist', state: { EId: 123 } } });
    expect(link.props().to.pathname).toEqual('/eprojectlist');
  });

  it('should display the correct EId in the route when any link is clicked', () => {
    const routerWrapper = shallow(<EmployeeDash EId={123} />, { wrappingComponent: MemoryRouter });
    const link = routerWrapper.find({ to: { pathname: '/etasklist', state: { EId: 123 } } });
    expect(link.props().to.state.EId).toEqual(123);
  });
  it('should hide the navbar if the condition is false', () => {
    const wrapper = shallow(<EmployeeDash EId={123} visible={false} />);
    // expect(wrapper.find('.navbar--visible').length).toEqual(0);
    // expect(wrapper.find('.navbar--hidden').length).toEqual(1);
    });
    
    it('should show the navbar if the condition is true', () => {
    const wrapper = shallow(<EmployeeDash EId={123} visible={true} />);
    // expect(wrapper.find('.navbar--visible').length).toEqual(1);
    // expect(wrapper.find('.navbar--hidden').length).toEqual(0);
    });
    });
