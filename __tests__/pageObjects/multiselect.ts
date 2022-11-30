import { SelectOptionOrGroup } from '@rescui/select/lib/types';
import { screen } from '@testing-library/react';

interface AssertionResult {
    value: boolean;
    message: string;
}

export const multiselect = {
    // Page objects

    getContainer: async () => screen.findByTestId('select-wrapper'),
    getActiveTags: async () => screen.findAllByTestId('removable-tag'),
    getDropdownIcon: async () => screen.findByTestId('down-icon'),

    // Step objects

    compareTags: function ({
        activeTags,
        expectedOptions
    }: {
        activeTags: HTMLElement[];
        expectedOptions: SelectOptionOrGroup[];
    }): AssertionResult {
        return activeTags.reduce(
            (
                { value, message }: AssertionResult,
                { textContent: tagText }: HTMLElement,
                i: number
            ): AssertionResult => {
                const expectedText = expectedOptions[i].label;
                if (tagText === expectedText) {
                    return { value, message };
                }
                const failedAssertionMessage = `tag [${i}] has unexpected text: expected "${expectedText}", but found "${tagText}" `;

                return {
                    value: false,
                    message: `${message}\n${failedAssertionMessage}`
                };
            },
            { value: true, message: '' }
        );
    }
};
