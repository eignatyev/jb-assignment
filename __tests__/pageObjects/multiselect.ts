import { SelectOptionOrGroup } from '@rescui/select/lib/types';
import { fireEvent, screen, within } from '@testing-library/react';
import { ensureElementExists } from '../ensureElementExists';

interface AssertionResult {
    value: boolean;
    message: string;
}

class Multiselect {
    // Page objects

    public get container() {
        return screen.queryByTestId('select-wrapper');
    }

    public get inputField() {
        return screen.queryByTestId('select');
    }

    public get allTags() {
        return within(ensureElementExists(this.inputField)).queryAllByTestId(
            'removable-tag'
        );
    }

    public get dropdownIcon() {
        return screen.queryByTestId('down-icon');
    }

    public get dropdownContainer() {
        return screen.queryByTestId('dropdown');
    }

    public getDropdownOption(text: string) {
        return within(ensureElementExists(this.dropdownContainer)).queryByText(
            text
        );
    }

    public getTag(label: string) {
        return within(ensureElementExists(this.inputField)).queryByText(label);
    }

    // Step objects

    public openDropdown() {
        fireEvent.click(ensureElementExists(this.dropdownIcon));
    }

    public addTags(tagLabels: string[]) {
        tagLabels.forEach((label) => {
            const tag = ensureElementExists(this.getDropdownOption(label));
            fireEvent.click(tag);
        });
    }

    public async removeTags(tagLabels: string[]) {
        tagLabels.forEach(async (label) => {
            const tag = ensureElementExists(this.getTag(label));
            const closeButton = await within(tag).findByTestId(
                'removable-tag-remove-icon'
            );
            fireEvent.click(closeButton);
        });
    }

    // Comparison helpers

    public compareTags({
        activeTags,
        expectedTags
    }: {
        activeTags: HTMLElement[];
        expectedTags: SelectOptionOrGroup[];
    }): AssertionResult {
        const presentLabels = activeTags.map((tag) => tag.textContent ?? '');
        const expectedLabels = expectedTags.map((tag) => tag.label as string);

        const unexpectedTags = presentLabels.filter(
            (label) => !expectedLabels.includes(label)
        );
        const missingTags = expectedLabels.filter(
            (label) => !presentLabels.includes(label)
        );

        const message = unexpectedTags
            .map((tag): string => `unexpected tag is present: ${tag}`)
            .concat(
                missingTags.map(
                    (tag): string => `expected tag is missing: ${tag}`
                )
            )
            .join('\n');

        return { value: message.length === 0, message };
    }
}

export const multiselect = new Multiselect();
