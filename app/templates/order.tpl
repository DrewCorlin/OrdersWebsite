<div class="js-text-container text-container">
    <div class="header-container">
        <div class="label"> <%- label %> </div>
        <div class="customer"> - <%- customer %> </div>
    </div>
    <% if (description) { %>
        <ul class="description-container">
            <li class="description"> <%- description %> </li>
        </ul>
    <% } %>
</div>
<button class="js-confirm-order-button btn">Confirm</button>