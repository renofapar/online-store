import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  TextField,
  InputLabel,
  Select,
  FormControl,
  FormHelperText,
  MenuItem,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { push, ref } from "firebase/database";
import { database } from "../../firebase";
import { storage } from '../../firebase'
import {ref as refStorage, uploadBytes, getDownloadURL} from 'firebase/storage'
export const FormCart = () => {
  const {
    handleSubmit,
    reset,
    control,
    formState: { isLoading },
  } = useForm({
    defaultValues: {
      name: "",
      shortDescription: "",
      longDescription: "",
      price: 1,
      category: "topRated",
      pictureUrl: ""
    },
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    
    if(data.pictureUrl) {
      const imageRef = refStorage(storage, `cartImage/${data.name + data.pictureUrl.name}`)
      uploadBytes(imageRef, data.pictureUrl)
      .then(() => {
        getDownloadURL(imageRef)
        .then((url) => {
          if(url) {
            writeCartData({...data, url: url});
          }
        })
        .catch(e => console.error(e.message))
      })
      .catch(e => console.error('upload bytes', e.message))
    }
    reset();
  };

  const writeCartData = (data) => {
    push(ref(database, "shirts"), data);
  };

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      maxWidth={320}
      height="450px"
      justifyContent="space-between"
    >
      <Controller
        name="name"
        control={control}
        rules={{ required: "required field" }}
        render={({
          field: { onBlur, value, onChange },
          fieldState: { error  },
          formState: {isLoading}
        }) => (
          <FormControl>
            <TextField
              label="name"
              variant="outlined"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
            {error && (
              <Typography color="secondary" mt="5px">
                {error?.message}
              </Typography>
            )}
          </FormControl>
        )}
      />

      <Controller
        name="shortDescription"
        control={control}
        rules={{ required: "required field" }}
        render={({
          field: { onBlur, value, onChange },
          fieldState: { error },
        }) => (
          <FormControl>
            <TextField
              label="short description"
              variant="outlined"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
            {error && (
              <Typography color="secondary" mt="5px">
                {error?.message}
              </Typography>
            )}
          </FormControl>
        )}
      />

      <Controller
        name="longDescription"
        control={control}
        rules={{ required: "required field" }}
        render={({
          field: { onBlur, value, onChange },
          fieldState: { error },
        }) => (
          <>
            <TextField
              label="long description"
              variant="outlined"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
            />
            {error && (
              <Typography color="secondary" mt="5px">
                {error?.message}
              </Typography>
            )}
          </>
        )}
      />
      <Controller
        name="price"
        control={control}
        rules={{ required: "required field" }}
        render={({
          field: { onBlur, value, onChange },
          fieldState: { error },
        }) => (
          <FormControl>
            <TextField
              label="price"
              variant="outlined"
              value={value}
              onBlur={onBlur}
              onChange={onChange}
            />
            {error && (
              <Typography color="secondary" mt="5px">
                {error?.message}
              </Typography>
            )}
          </FormControl>
        )}
      />
      <Controller
        name="category"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <FormControl>
            <InputLabel id="inputLabel">Category</InputLabel>
            <Select labelId="inputLabel" {...field} label="category">
              <MenuItem value="topRated">Top rated</MenuItem>
              <MenuItem value="newArrivals">New arrivals</MenuItem>
              <MenuItem value="bestSellers">Best sellers</MenuItem>
            </Select>
          </FormControl>
        )}
      />

      <Controller
        name="pictureUrl"
        control={control}
        render={({field: {onChange}}) => (
          <FormControl>
            <Button variant="contained" component="label">
              Upload
              <input hidden type="file" onChange={(e) => onChange(e.target.files[0])} multiple/>
            </Button>
          </FormControl>
        )}
      />

      <Box display="flex" justifyContent="space-between">
        <Button
          onClick={handleSubmit(onSubmit)}
          size="large"
          variant="contained"
          type="submit"
          color="success"
        >
          Add cart
        </Button>

        {!isLoading && <CircularProgress size={25} />}
        <Button
          onClick={() => reset()}
          variant="outlined"
          size="large"
        >
          reset
        </Button>
      </Box>
    </Box>
  );
};
