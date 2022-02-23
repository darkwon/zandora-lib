<h1>Zandora Library</h1>
<div style="text-align:center;">
 <!-- [START BADGES] -->
 <img src="https://img.shields.io/badge/dynamic/json?style=for-the-badge&color=blue&label=Version&query=version&url=https%3A%2F%2Fraw.githubusercontent.com%2Fdarkwon%2Fzandora-lib%2Fmain%2Fmodule.json" />
 <img src="https://img.shields.io/badge/dynamic/json?style=for-the-badge&color=red&label=FoundryVTT&query=compatibleCoreVersion&url=https%3A%2F%2Fraw.githubusercontent.com%2Fdarkwon%2Fzandora-lib%2Fmain%2Fmodule.json" />
 <img src="https://img.shields.io/badge/dynamic/json?style=for-the-badge&color=orange&label=System&query=system&url=https%3A%2F%2Fraw.githubusercontent.com%2Fdarkwon%2Fzandora-lib%2Fmain%2Fmodule.json" />
<!-- [END BADGES] -->
</div>
<h2>Description</h2>
<div>
    The Zandora Library contains tools for the dnd5e game system and foundry VTT that other modules can leverage using the built-in API. All options will be configurable within the module settings. 
    The goal for this module is to provide a stable and functioning subsystem of the dnd5e system.
</div>
<h2>Current Functions</h2>
<div>
<ul>
    <li>Award XP
        <ul>
            <li>Default: Challenge Rating (CR) and questing XP</li>
            <li>Session: XP at end of session based on character level</li>
            <li>Milestone: XP granted at major turning points</li>
        </ul>
    </li>
    <li>5e Variant Rules
        <ul>
            <li>Speed Factor Iniative (current rerolls at start of round)</li>
        </ul>    
    </li>
</ul>
</div>
<h2>Design Goals</h2>
<div>
<ul>
    <li>Library Functions</li>
        <ul>
            <li>Import / Export option for the Zandora Library subsystem settings.</li>
        </ul>
    <li>5e Variant Rules</li>
        <ul>
            <li>Speed Factor Iniative: Prompt players for their actions</li>
            <li>Mana: Enable the use of mana or spell points</li>
            <li>Slow Natural Healing: Extends the dnd5e system for Rest Variant. Characters use Hit Dice at end of long rest, instead of getting all health back</li>
        </ul>
    <li>Foundry QoL Features<li>
        <ul>
            <li>Hot Bar
                <ul>
                    <li>More bars: Create option to display more than  one bar at a time on the screen.</li>
                    <li>Tooltip: Extend tool tip to display more information about the item on the hotbar.</li>
                </ul>
            </li>
            <li>Utility Bar: Create a small bar next to hotbar with additional features</li>
                <ul>
                    <li>Bags: Create drag and drop bags next to hot bar.</li>
                    <li>Crafting: Creating a crafting interface with configurable crafting styles (blacksmithing, enchanting, ex) with configurable crafting recipes (wand of magic missile, Plate armor, potion of heroism, ex).</li>
                    <li>Achievements: Create an achievements interface linked to the player.</li>
                    <li>Renown: Create a configuratble renown interface, which tracks player status with world factions and/or organizations and displays benefits if any the character receives.</li>
                </ul>
                <li><a href="https://github.com/darkwon/zandora-party-frame">Zandora Party Frame:</a> Migrate party frame module or route its functions here and have it showup as players login or logout instead of using tokens on the canvas.
                    <ul>
                        <li>Show Active buffs in the party frame with hoverable tooltips.</li>
                        <li>Change right mouse click from open player sheet, to a context menu with options.</li>
                    </ul>
                </li>
        </ul>
</ul>
</div>

