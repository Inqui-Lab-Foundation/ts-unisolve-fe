import React from 'react';
import PropTypes from 'prop-types';
import './TextArea.scss';
/**
 * Primary UI component for user interaction
 */
export const TextArea = ({
    placeholder,
    type,

    name,
    onChange,
    value,
    onBlur,
    id,
    maxLength,
    disabled
}) => {
    return (
        <div className="form-group textarea">
            <textarea
                type={type}
                className="form-control"
                value={value}
                placeholder={placeholder}
                rows="4"
                onChange={onChange}
                onBlur={onBlur}
                id={id}
                disabled={disabled}
                name={name}
                maxLength={maxLength}
                aria-describedby="basic-addon1"
            ></textarea>
        </div>
    );
};

TextArea.propTypes = {
    /**
     * Is this the principal call to action on the page?
     */
    SingleSelectDropdown: PropTypes.bool,
    /**
     * What background color to use
     */
    backgroundColor: PropTypes.string,
    /**
     * How large should the button be?
     */
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * Button contents
     */
    label: PropTypes.string.isRequired,
    /**
     * Optional click handler
     */
    onClick: PropTypes.func
};

TextArea.defaultProps = {
    backgroundColor: null,
    //   size: "medium",
    onClick: undefined,
    label: 'Select Pic'
    //   options: ["Garde 1", "Garde 2", "Garde 3", "Garde 4", "Garde 5", "Garde 6"],
};
