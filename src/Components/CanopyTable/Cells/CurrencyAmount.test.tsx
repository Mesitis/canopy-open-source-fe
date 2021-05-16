/*
 * Copyright 2021 Canopy Pte Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
