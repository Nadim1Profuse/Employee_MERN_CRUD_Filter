
import React from "react";


export default function SidebarMenu(){
    return(
        <ul>
                <li>
                    <a href="#" >
                        <span class="icon"><i class="fas fa-home"></i></span>
                        <span class="item">Home</span>
                    </a>
                </li>
                <li>
                    <a href="#" className="active">
                        <span className="icon"><i class="fas fa-desktop"></i></span>
                        <span className="item">My Dashboard</span>
                    </a>
                </li>
                {/* <li>
                    <a href="#">
                        <span className="icon"><i class="fas fa-user-friends"></i></span>
                        <span className="item">People</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className="icon"><i class="fas fa-tachometer-alt"></i></span>
                        <span className="item">Perfomance</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className="icon"><i class="fas fa-database"></i></span>
                        <span className="item">Development</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className="icon"><i class="fas fa-chart-line"></i></span>
                        <span className="item">Reports</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className="icon"><i class="fas fa-user-shield"></i></span>
                        <span className="item">Admin</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <span className="icon"><i class="fas fa-cog"></i></span>
                        <span classname="item">Settings</span>
                    </a>
                </li> */}
            </ul>
    )
}