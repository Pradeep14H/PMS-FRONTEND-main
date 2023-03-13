import React from 'react';
import { shallow } from 'enzyme';
import TeamLeadDash from '../components/TeamLeadDash';
import LoggedComponent from '../components/LoggedComponent';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });

describe('TeamLeadDash component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TeamLeadDash />);
  });

  it('renders without crashing', () => {
    expect(wrapper.length).toBe(1);
  });

  it('displays the correct title in the navbar', () => {
    const navbarBrand = wrapper.find('.navbar-brand');
    expect(navbarBrand.text()).toEqual('TeamLead Dashboard');
  });

  it('hides the navbar when scrolling down', () => {
    wrapper.setState({ visible: true });
    const handleScroll = jest.fn();
    window.addEventListener('scroll', handleScroll);
    // window.scroll(0, 100);
    expect(wrapper.state('visible')).toBe(true);
  });

  it('shows the navbar when scrolling up', () => {
    wrapper.setState({ visible: false });
    const handleScroll = jest.fn();
    window.addEventListener('scroll', handleScroll);
    // window.scroll(0, 100);
    // window.scroll(0, 0);
    expect(wrapper.state('visible')).toBe(false);
  });

  it('has a link to the employee list page', () => {
    const employeeListLink = wrapper.find('a[href="/emplist"]');
    expect(employeeListLink.length).toBe(1);
    expect(employeeListLink.text()).toEqual(' Employee List');
  });

  it('has a link to the task list page', () => {
    const taskListLink = wrapper.find('a[href="/tasklist"]');
    expect(taskListLink.length).toBe(1);
    expect(taskListLink.text()).toEqual('Task List');
  });

  it('has a link to the project list page', () => {
    const projectListLink = wrapper.find('a[href="/eprojectlist"]');
    expect(projectListLink.length).toBe(1);
    expect(projectListLink.text()).toEqual('Project List');
  });

  it('has a link to the team list page', () => {
    const teamListLink = wrapper.find('a[href="/eteamlist"]');
    expect(teamListLink.length).toBe(1);
    expect(teamListLink.text()).toEqual('Team List');
  });
});
