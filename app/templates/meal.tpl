<div class="js-text-container text-container">
    <div class="header-container">
        <div class="label"> <%- label %> </div>
    </div>
    <% if (description) { %>
        <ul class="description-container">
            <li class="description"> <%- description %> </li>
        </ul>
    <% } %>
</div>
<div>
    <div class="js-delete-meal-button delete-meal-button">x</div>
    <!-- TODO Task-03: Use roles to restrict the delete button only to chefs -->
</div>
<div class="modal hidden">
    <div class="modal-content">
        <div class="modal-title"><%- modalTitle %>
            <div class="js-modal-close modal-close">&times;</div>
        </div>
        <div class="meal-modal-interactions-container">
            <input type="text" name="description" placeholder="description" class="js-description-input text-input">
            <button class="js-select-meal-button btn">Select</button>
        </div>
    </div>
</div>