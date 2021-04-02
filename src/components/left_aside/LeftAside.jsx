import React from 'react'

const leftAside = ({menuItems, handleChange}) => {
    return (
        <div>
            <div className="list-group">
                {menuItems.map(menu => (
                    <button style={(menu.selected)? {
                        borderLeft: '5px solid orange', 
                        borderRadius: '0px'
                    }: {}} value={menu.name} onClick={handleChange()} key={menu.id} className="form-control list-group-item">{menu.alias}</button>
                ))}
            </div>
        </div>
    )
};

export default leftAside;