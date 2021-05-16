import React from 'react';
import { mount } from 'enzyme';
import CurrencyAmount from './CurrencyAmount';
import CurrencyLib from 'currency.js';
let wrapper: any;
beforeEach(() => {
    wrapper = mount(<CurrencyAmount amount="2000" percent={false} />);
});
describe('<CurrencyAmount /> ', () => {
    test('Amount from the props should be renderd without % sign if percent = false', () => {
        const expectedResponse = CurrencyLib(' 2000', {
            symbol: '',
        }).format();
        expect(wrapper.text().trim()).toEqual(expectedResponse.trim());
    });
    test('Amoutn from the props should be rendered with % sign if percent = true', () => {
        wrapper = mount(<CurrencyAmount amount="2000" percent={true} />);
        const expectedResponse = `${CurrencyLib('2000', {
            symbol: '',
        }).format()}%`;
        expect(wrapper.text().trim()).toEqual(expectedResponse.trim());
    });
    test('Blank text should render if amount is not present', () => {
        wrapper = mount(<CurrencyAmount percent={true} />);
        const expectedResponse = `<p class="chakra-text css-0">-</p>`;
        expect(wrapper.html()).toEqual(expectedResponse);
    });
    test('Precent should be false by default when not recieved in the props', () => {
        wrapper = mount(<CurrencyAmount amount="2000" />);
        const expectedResponse = CurrencyLib(' 2000', {
            symbol: '',
        }).format();
        expect(wrapper.text().trim()).toEqual(expectedResponse.trim());
    });
});
