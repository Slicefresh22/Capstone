import React from 'react'

const leftAside = ({menuItems, handleChange}) => {
    return (
        <div>
            <div className="list-group mb-4">
                {menuItems.map(menu => (
                    <button style={(menu.selected)? {
                        borderLeft: '6px solid orange', 
                        borderRadius: '0px'
                    }: {}} value={menu.name} onClick={handleChange()} key={menu.id} className="form-control list-group-item mb-1"> 
                    <i className={menu.icon} style={{float:'left', color: 'darkBlue'}}></i> {' ' } {menu.alias}</button>
                    
                ))}
            </div>
        </div>
    )
};

export default leftAside;