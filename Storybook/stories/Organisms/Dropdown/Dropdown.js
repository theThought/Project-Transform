const style = `
<style>
    ul.m-list {
        left: auto; /* Display list without reliance on JS */
    }
</style>
`;

export const DropdownHtml = () => `
${style}
<div class="o-dropdown">
    <input type="text" class="a-input-dropdown" placeholder="placeholder" />
    <ul class="m-list">
        <li class="a-option-list">I am 1st option in dropdown or combobox</li>
        <li class="a-option-list">I am 2nd option in dropdown or combobox</li>
        <li class="a-option-list">I am 3rd option in dropdown or combobox</li>
        <li class="a-option-list">I am 4th option in dropdown or combobox</li>
    </ul>
</div>
`;
