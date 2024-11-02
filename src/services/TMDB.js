import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    // Get Genres
    getGenres: builder.query({
      query: () => `/genre/movie/list?api_key=${tmdbApiKey}`,
    }),
    // Get Movies by [Type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        // Get Movies by Search
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }
        // Get Movies by Category
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
          return `/movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }

        // Get Movies by Genre
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
        }

        // Get popular movies by default
        return `/movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
    // Get Movie
    getMovie: builder.query({
      query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    }),

    // Get Recommendations
    getRecommendations: builder.query({
      query: ({ movieId, list }) => `/movie/${movieId}/${list}?api_key=${tmdbApiKey}`,
    }),

    // Get Actor
    getActorDetails: builder.query({
      query: (id) => `person/${id}?api_key=${tmdbApiKey}`,
    }),
    // Get Movies by Actor
    getMoviesByActorId: builder.query({
      query: ({ id, page }) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`,
    }),

    // Get User Specific Lists
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) => `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
    }),
  }),
});
/*  */
export const {
  useGetGenresQuery,
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorDetailsQuery,
  useGetMoviesByActorIdQuery,
  useGetListQuery,

} = tmdbApi;

/* eslint-disable */

/* penjelasan createApi dan createSlice 

`createApi` dan `createSlice` adalah dua utilitas yang disediakan oleh [Redux Toolkit](https://redux-toolkit.js.org/) yang memiliki tujuan berbeda dalam pengelolaan state dan pengambilan data di aplikasi Redux. Berikut adalah perbedaan utama antara keduanya:

## `createSlice`

### Deskripsi
`createSlice` adalah fungsi yang digunakan untuk membuat **slice** dari state Redux. Slice ini mencakup:
- **Nama slice**: Identifier unik untuk slice tersebut.
- **Initial state**: State awal untuk slice.
- **Reducers**: Fungsi yang menentukan bagaimana state berubah sebagai respons terhadap aksi (actions).

### Fitur Utama
- **Simplifikasi Reducers dan Actions**: `createSlice` secara otomatis menghasilkan aksi aksi (action creators) dan action types berdasarkan reducers yang didefinisikan.
- **Immutability dengan Immer**: Menggunakan [Immer](https://immerjs.github.io/immer/) secara internal, memungkinkan penulisan kode reducers yang terlihat mutatif tetapi tetap immutabel.
- **Organisasi State**: Membantu dalam mengorganisir state menjadi bagian-bagian yang lebih kecil dan terkelola dengan baik.

### Contoh Penggunaan
```javascript
import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => { state.value += 1; },
    decrement: (state) => { state.value -= 1; },
    incrementByAmount: (state, action) => { state.value += action.payload; },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

## `createApi`

### Deskripsi
`createApi` adalah fungsi yang digunakan untuk membuat **API slice** dalam konteks [RTK Query](https://redux-toolkit.js.org/rtk-query/overview). RTK Query adalah alat untuk melakukan pengambilan data (data fetching) dan pengelolaan cache dalam aplikasi Redux.

### Fitur Utama
- **Pengambilan Data Otomatis**: Menyederhanakan proses pengambilan data dari API dengan middleware yang terintegrasi.
- **Caching dan Re-fetching**: Menyediakan caching otomatis dan mekanisme untuk memperbarui data ketika diperlukan.
- **Optimasi Performance**: Mengurangi kebutuhan untuk menulis banyak kode boilerplate terkait pengambilan data dan manajemen status (loading, error, success).
- **Integrasi dengan Redux Store**: Data yang diambil oleh `createApi` dapat dengan mudah diakses dan diintegrasikan ke dalam state global Redux.

### Contoh Penggunaan
```javascript
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api', // Nama slice untuk store Redux
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.example.com' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
    }),
    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
    }),
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery } = api;
```

## Perbandingan Singkat

| Fitur            | `createSlice`                             | `createApi`                              |
|------------------|-------------------------------------------|------------------------------------------|
| **Tujuan Utama** | Mengelola bagian tertentu dari state Redux | Mengelola pengambilan data dan cache API |
| **Fokus**        | State management dan reducers             | Data fetching dan caching                |
| **Fitur Tambahan** | Aksi otomatis, integrasi Immer          | Otomatisasi pengambilan data, caching    |
| **Penggunaan**   | State lokal aplikasi, seperti counter     | Integrasi dengan API eksternal           |

## Kesimpulan

- Gunakan `createSlice` ketika Anda perlu mengelola state lokal aplikasi dan mendefinisikan bagaimana state tersebut berubah melalui reducers.
- Gunakan `createApi` ketika Anda perlu mengambil data dari API eksternal dengan efisien, mengelola cache, dan mengoptimalkan performa pengambilan data.

Dengan memanfaatkan kedua utilitas ini secara bersamaan, Anda dapat membangun aplikasi Redux yang lebih terstruktur, efisien, dan mudah dikelola.

*/