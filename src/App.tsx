/* eslint-disable jsx-a11y/accessible-emoji */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

interface Category {
  id: number;
  title: string;
  icon: string;
  ownerId: number;
}

interface Product {
  id: number;
  name: string;
  categoryId: number;
}

interface User {
  id: number;
  name: string;
  sex: string;
}

const App: React.FC = () => {
  const users: User[] = usersFromServer || [];
  const categories: Category[] = categoriesFromServer || [];
  const products: Product[] = productsFromServer || [];

  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState('');

  const handleFilterUser = (userId: number) => {
    setSelectedUser(userId);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const getUserNameColor = (sex: 'm' | 'f'): string => (sex === 'm'
    ? 'has-text-link'
    : 'has-text-danger');

  const filteredProducts = products.filter((product) => {
    const category = categories.find(cat => cat.id === product.categoryId);
    const user = users.find(usr => usr.id === category.ownerId);

    if (selectedUser) {
      return user.id === selectedUser;
    }

    return true;
  });

  const searchedProducts = filteredProducts.filter((product) => {
    const productName = product.name.toLowerCase();
    const searchValueLower = searchValue.toLowerCase();

    return productName.includes(searchValueLower);
  });

  const renderUserFilters = users.map(user => (
    <a
      key={user.id}
      href="#/"
      className={`has-text-weight-bold ${
        user.id === selectedUser ? 'is-active' : ''
      }`}
      onClick={() => handleFilterUser(user.id)}
    >
      {user.name}
    </a>
  ));

  const renderUsersTabs = (
    <p className="panel-tabs has-text-weight-bold">
      {renderUserFilters}
    </p>
  );

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            {renderUsersTabs}

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={searchValue}
                  onChange={handleSearch}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  <button
                    data-cy="ClearButton"
                    type="button"
                    className="delete"
                    onClick={() => setSearchValue('')}
                  />
                </span>
              </p>
            </div>

          </nav>
        </div>
        <div className="box table-container">
          <p data-cy="NoMatchingMessage">
            No products matching selected criteria
          </p>

          <table
            data-cy="ProductTable"
            className="table is-striped is-narrow is-fullwidth"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    ID

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Product

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-down" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Category

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort-up" />
                      </span>
                    </a>
                  </span>
                </th>

                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    User

                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              <tr data-cy="Product">
                <td className="has-text-weight-bold" data-cy="ProductId">
                  1
                </td>

                <td data-cy="ProductName">Milk</td>
                <td data-cy="ProductCategory">🍺 - Drinks</td>

                <td
                  data-cy="ProductUser"
                  className="has-text-link"
                >
                  Max
                </td>
              </tr>

              <tr data-cy="Product">
                <td className="has-text-weight-bold" data-cy="ProductId">
                  2
                </td>

                <td data-cy="ProductName">Bread</td>
                <td data-cy="ProductCategory">🍞 - Grocery</td>

                <td
                  data-cy="ProductUser"
                  className="has-text-danger"
                >
                  Anna
                </td>
              </tr>

              <tr data-cy="Product">
                <td className="has-text-weight-bold" data-cy="ProductId">
                  3
                </td>

                <td data-cy="ProductName">iPhone</td>
                <td data-cy="ProductCategory">💻 - Electronics</td>

                <td
                  data-cy="ProductUser"
                  className="has-text-link"
                >
                  Roma
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
