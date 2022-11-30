import '@testing-library/jest-dom';
import React from 'react';
import { Multiselect } from '@rescui/select';
import { act, configure, render } from '@testing-library/react';
import { multiselect } from '../pageObjects';
import { ensureElementExists } from '../ensureElementExists';

configure({ testIdAttribute: 'data-test' });

const options = [
    { label: 'St. Petersburg', value: 'spb' },
    { label: 'Moscow', value: 'msk' },
    { label: 'Novosibirsk', value: 'nsk' },
    { label: 'Prague', value: 'prg' },
    { label: 'Boston', value: 'bos' },
    { label: 'Munich', value: 'muc' }
];

test('should be possible to apply a custom class', () => {
    const customClass = 'custom-class';

    render(<Multiselect className={customClass} options={[]} value={[]} />);

    const actualClass = ensureElementExists(multiselect.container).className;

    expect(actualClass).toContain(customClass);
});

test('should display predefined values', () => {
    render(<Multiselect options={options} value={options} />);

    const { value, message } = multiselect.compareTags({
        activeTags: multiselect.allTags,
        expectedTags: options
    });

    expect(value, message).toBeTruthy();
});

test('should allow to open the dropdown menu', async () => {
    render(<Multiselect options={options} value={[]} />);

    expect(multiselect.dropdownContainer).toBeNull();

    await act(async () => multiselect.openDropdown());

    expect(multiselect.dropdownContainer).toBeVisible();
});

test('should allow to add tags', async () => {
    const tagsToAdd = options.slice(3, 5);

    render(<Multiselect options={options} value={[]} />);

    const { value: valueBeforeAddition, message: messageBeforeAddition } =
        multiselect.compareTags({
            activeTags: multiselect.allTags,
            expectedTags: []
        });

    expect(valueBeforeAddition, messageBeforeAddition).toBeTruthy();

    await act(async () => multiselect.openDropdown());

    multiselect.addTags(tagsToAdd.map((option) => option.label));

    const { value: valueAfterAddition, message: messageAfterAddition } =
        multiselect.compareTags({
            activeTags: multiselect.allTags,
            expectedTags: tagsToAdd
        });

    expect(valueAfterAddition, messageAfterAddition).toBeTruthy();
});

test('should allow to remove tags', async () => {
    const optionsToRemove = options.slice(1, 3).map((option) => option.label);

    render(<Multiselect options={options} value={options} />);

    const { value: valueBeforeRemoval, message: messageBeforeRemoval } =
        multiselect.compareTags({
            activeTags: multiselect.allTags,
            expectedTags: options
        });

    expect(valueBeforeRemoval, messageBeforeRemoval).toBeTruthy();

    await act(async () => multiselect.openDropdown());

    multiselect.removeTags(optionsToRemove);

    const expectedTags = options.filter(
        ({ label }) => !optionsToRemove.includes(label)
    );

    const { value: valueAfterRemoval, message: messageAfterRemoval } =
        multiselect.compareTags({
            activeTags: multiselect.allTags,
            expectedTags
        });

    expect(valueAfterRemoval, messageAfterRemoval).toBeTruthy();
});
