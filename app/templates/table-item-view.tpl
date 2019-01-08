<div class="js-text-container text-container">
    <div class="header-container">
        <div class="label"> <%- label %> </div>
        <% if (isOrder) { %>
            <div class="customer"> - <%- customer %> </div>
        <% } %>
    </div>
    <% if (description) { %>
        <ul class="description-container">
            <li class="description"> <%- description %> </li>
        </ul>
    <% } %>
</div>
<% if (isOrder) { %>
    <button class="js-confirm-order-button btn">Confirm</button>
<% } else { %>
    <div>
        <input type="text" name="description" placeholder="description" class="js-description-input text-input">
        <button class="js-select-meal-button btn">Select</button>
    </div>
<% } %>