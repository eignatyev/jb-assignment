import '@testing-library/jest-dom';
import React from 'react';
import { Multiselect } from '@rescui/select';
import { configure, render } from '@testing-library/react';
import { multiselect } from './pageObjects';

configure({ testIdAttribute: 'data-test' });

const OPTIONS = [
    { label: 'St. Petersburg', value: 'spb' },
    { label: 'Moscow', value: 'msk' },
    { label: 'Novosibirsk', value: 'nsk' },
    { label: 'Prague', value: 'prg' },
    { label: 'Boston', value: 'bos' },
    { label: 'Munich', value: 'muc' }
];

test('should be possible to apply a custom class', async (): Promise<void> => {
    const customClass = 'custom-class';

    render(<Multiselect className={customClass} options={[]} value={[]} />);

    const container = await multiselect.getContainer();

    const actualClass = container.className;

    expect(actualClass).toContain(customClass);
});

test('should display predefined values', async (): Promise<void> => {
    render(<Multiselect options={OPTIONS} value={OPTIONS} />);

    const activeTags = await multiselect.getActiveTags();

    const { value, message } = multiselect.compareTags({
        activeTags,
        expectedOptions: OPTIONS
    });

    expect(value, message).toBeTruthy();
});
