export const OptionSingleHtml = () => `
<div class="m-option-base m-option-single-answer">
    <input type="radio" class="hiddencontrol" id="radio1" name="radios" />
    <label for="radio1">
        <span class="a-icon-multistate" data-icontype="single"></span>
        <span class="a-label-option">
            Radio label
        </span>
    </label>
</div>
`;

export const OptionMultiHtml = () => `
<div class="m-option-base m-option-multi-answer">
    <input type="checkbox" class="hiddencontrol" id="check1" />
    <label for="check1">
        <span class="a-icon-multistate" data-icontype="multi"></span>
        <span class="a-label-option">
            Checkbox label
        </span>
    </label>
</div>
`;
