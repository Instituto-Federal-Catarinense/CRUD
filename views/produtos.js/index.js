<h1>All Products</h1>
<table class="table">
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Category</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <% products.forEach(product => { %>
            <tr>
                <td><%= product.id %></td>
                <td><%= product.name %></td>
                <td>$<%= product.price.toFixed(2) %></td>
                <td><%= product.description %></td>
                <td><%= product.category %></td>
                <td>
                    <a href="/products/<%= product.id %>" class="btn btn-primary">View</a>
                    <a href="/products/<%= product.id %>/edit" class="btn btn-warning">Edit</a>
                    <form action="/products/<%= product.id %>?_method=DELETE" method="POST" style="display: inline;">
                        <button type="submit" class="btn btn-danger">Delete</button>
                    </form>
                </td>
            </tr>
        <% }) %>
    </tbody>
</table>
<a href="/products/new" class="btn btn-success">Add New Product</a>
