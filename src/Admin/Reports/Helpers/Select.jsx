const Select = ({ list, setValue }) => {
    return (
        <select onChange={(e) => setValue(e.target.value)}>
            {list && list.length > 0 ? (
                list.map((item, i) => (
                    <option key={i} value={item}>
                        {item}
                    </option>
                ))
            ) : (
                <option>No Data found</option>
            )}
        </select>
    );
};

export default Select;
