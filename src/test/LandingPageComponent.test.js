import React from 'react';
import { render, screen } from '@testing-library/react';
import LandingPageComponent from '../components/LandingPageComponent';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { shallow } from 'enzyme';
import HeaderComponent from '../components/HeaderComponent';

Enzyme.configure({ adapter: new Adapter() });

describe('LandingPageComponent', () => {
  test('renders HeaderComponent', () => {
    const wrapper = shallow(<LandingPageComponent />);
    expect(wrapper.find(HeaderComponent)).toHaveLength(1);
  });
      
  test('renders banner image', () => {
    const wrapper = shallow(<LandingPageComponent />);
    expect(wrapper.find('.banner-image')).toHaveLength(1);
  });

  test('renders heading', () => {
    const wrapper = shallow(<LandingPageComponent />);
    const heading = wrapper.find('.text-size-h1');
    expect(heading).toHaveLength(1);
    // expect(heading.text()).toEqual("PMS");
  });
  test('renders description', () => {
    const wrapper = shallow(<LandingPageComponent />);
    const description = wrapper.find('.button-css');
    expect(description).toHaveLength(1);
    expect(description.text()).toContain('project management system');
  });
  test('applies CSS classes', () => {
    const wrapper = shallow(<LandingPageComponent />);
    expect(wrapper.find('.w-100')).toHaveLength(1);
    expect(wrapper.find('.vh-100')).toHaveLength(1);
    expect(wrapper.find('.d-flex')).toHaveLength(1);
    expect(wrapper.find('.justify-content-center')).toHaveLength(1);
    expect(wrapper.find('.align-items-center')).toHaveLength(1);
  });
  
});
