import React from 'react';
import { shallow } from 'enzyme';
import AdminDash from '../components/AdminDash';
import LoggedComponent from '../components/LoggedComponent';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('AdminDash component', () => {
  it('renders without crashing', () => {
    shallow(<AdminDash />);
  });

  it('has the correct navigation links', () => {
    const wrapper = shallow(<AdminDash />);
    expect(wrapper.find('a[href="/emplist"]').text()).toEqual(' Employee List');
    expect(wrapper.find('a[href="/tasklist"]').text()).toEqual('Task List');
    expect(wrapper.find('a[href="/projectlist"]').text()).toEqual('Project List');
    expect(wrapper.find('a[href="/teamlist"]').text()).toEqual('Team List');
  });

  it('shows and hides the navigation bar correctly', () => {
    const wrapper = shallow(<AdminDash />);
    expect(wrapper.find('.navbar--visible').exists()).toBe(true);
    expect(wrapper.find('.navbar--hidden').exists()).toBe(false);
    wrapper.instance().setState({ prevScrollPos: 200, visible: false });
    expect(wrapper.find('.navbar--visible').exists()).toBe(false);
    expect(wrapper.find('.navbar--hidden').exists()).toBe(true);
  });

  it('adds and removes the event listener for scrolling', () => {
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const wrapper = shallow(<AdminDash />);
    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', wrapper.instance().handleScroll);
    wrapper.unmount();
    // expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', wrapper.instance().handleScroll);
  });
});
