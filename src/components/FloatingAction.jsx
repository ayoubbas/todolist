import * as React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import UpIcon from "@mui/icons-material/KeyboardArrowUp";
import { green } from "@mui/material/colors";
import Box from "@mui/material/Box";
import TodoBar from "./TodoBar";
import { ModalOfInputs } from "./ModalOfInputs";
import { useContext } from "react";
import { MyTodos } from "../context/ContextTodos";

// ? uuid for id
import { v4 as uuid } from "uuid";
import AlertDialog from "./Dialog";
import Sneakbar from "./SneakBar";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
      
    >
      {value === index && <Box sx={{ p: 3  }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

const fabStyle = {
  position: "absolute",
  bottom: 16,
  right: 16,
  bgcolor:"#092635",
  color:"white",
  "&:hover":{
    bgcolor:"#1B4242"
  }
};

const fabGreenStyle = {
  color: "common.white",
  bgcolor: '#092635',
  "&:hover": {
    bgcolor: '#092635',
  },
};

export default function FloatingActionButtonZoom() {
  // ! setNew Todo ************
  const { todo, setTodos } = useContext(MyTodos);
  const [messageSneack, setMessageSneack] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [details, setDetails] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [openDialog, setOpenDialoge] = React.useState(false);
  const [idTodo, setIdtodo] = React.useState(false);
  const [kindOfModal, setKindOfModal] = React.useState(null);

  React.useEffect(() => {
    const getTodosFromLocale =
      JSON.parse(localStorage.getItem("todosArr")) ?? []; //! localeStorage
    setTodos(getTodosFromLocale);
  }, [setTodos]);
  // handleCloseOrOpen Dialoge

  const handleClickOpenDialoge = (id) => {
    setOpenDialoge(true);
    setIdtodo(id);
  };

  const handleCloseDialoge = () => {
    setOpenDialoge(false);
  };
  // handleCloseOrOpen Dialoge
  // handleAdd 💦💦💦💦💦💦💦💦💦💦💦💦
  const handleAdd = () => {
    const newTodo = {
      id: uuid(),
      title: title,
      details: details,
      isDone: false,
    };
    const addNewTodoInArray = [...todo, newTodo];
    setTodos(addNewTodoInArray);
    localStorage.setItem("todosArr", JSON.stringify(addNewTodoInArray)); //!localeStorage
    setTitle("");
    setDetails("");
  };
  // handleAdd 💦💦💦💦💦💦💦💦💦💦💦💦

  // ! setNew Todo ******************
  const theme = useTheme();
  //! useState foooooor modal🟥🟥🟥🟥🟥🟥
  const handleOpenModal = (kind) => {
    setKindOfModal(kind);
    setOpenModal(true);
  };
  const handleClose = () => setOpenModal(false);
  //! ******* end useState foooooor modal*******🟥🟥🟥🟥🟥🟥

  // * filter array of todos**********🟢🟢🟢🟢🟢
  const doneTodo = todo.filter((item) => item.isDone);
  const notDoneTodo = todo.filter((item) => !item.isDone);
  // * filter array of todos ********** 🟢🟢🟢🟢🟢

  // ? change the status of todo done or not⭕⭕⭕⭕
  const handleStatus = (id) => {
    // Find the element with the given id in the todo array
    const updatedTodos = todo.map((item) =>
      item.id === id ? { ...item, isDone: !item.isDone } : item
    );
    setTodos(updatedTodos);
    localStorage.setItem("todosArr", JSON.stringify(updatedTodos)); //!localeStorage
    setMessageSneack("The todo statu has been chenged");
    handleClickSneack({ vertical, horizontal });
    setTimeout(() => {
      handleCloseSneackBar();
    }, 2000);
  };

  // ? change the status of todo done or not  ⭕⭕⭕⭕

  const handleChange = (event, newValue) => setValue(newValue);

  const handleChangeIndex = (index) => setValue(index);

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = [
    {
      color: "#092635",
      sx: fabStyle,
      icon: <AddIcon />,
      label: "Add",
    },
    {
      color: "secondary",
      sx: fabStyle,
      icon: <EditIcon />,
      label: "Edit",
    },
    {
      color: "inherit",
      sx: { ...fabStyle, ...fabGreenStyle },
      icon: <UpIcon />,
      label: "Expand",
    },
  ];

  // snackBar for notification
  const [state, setState] = React.useState({
    openSneack: false,
    vertical: "bottom",
    horizontal: "left",
  });
  const { vertical, horizontal, openSneack } = state;

  const handleClickSneack = (newState) =>
    setState({ ...newState, openSneack: true });

  const handleCloseSneackBar = () => setState({ ...state, open: false });

  // delete a todo  ❌❌❌❌❌❌❌❌
  const clickDelete = (id) => {
    let filtered = todo.filter((item) => item.id !== id);
    setTodos(filtered);
    localStorage.setItem("todosArr", JSON.stringify(filtered));
    setMessageSneack("The todo has beed deleted");
    handleClickSneack({ vertical, horizontal });
    setTimeout(() => {
      handleCloseSneackBar();
    }, 2000);
  };
  // delete a todo  ❌❌❌❌❌❌❌❌7

  // ? handle Edite of Todo
  const handleEdite = (id) => {
    const currentElement = todo.filter((item) => item.id === id);
    handleOpenModal("edite");
    setTitle(currentElement[0].title);
    setDetails(currentElement[0].details);
    setIdtodo(id);
  };
  // ? handle Edite of Todo
  // handleOpenModal for add todo
  const handleOpenAddModal = () => handleOpenModal("add");

  // * 🖌🖌🖌🖌🖌🖌🖌🖌🖌🖌🖌
  const handleBtnEdite = () => {
    // Find the element with the given id in the todo array
    const updatedTodos = todo.map((item) =>
      item.id === idTodo ? { ...item, title: title, details: details } : item
    );
    setTodos(updatedTodos);
    localStorage.setItem("todosArr", JSON.stringify(updatedTodos)); //!localeStorage
    setTitle("")
    setDetails("")
    setMessageSneack("The todo has been Updated");
    handleClickSneack({ vertical, horizontal });
    setTimeout(() => {
      handleCloseSneackBar();
    }, 2000);
  };
  // * 🖌🖌🖌🖌🖌🖌🖌🖌🖌🖌🖌
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        width: 500,
        position: "relative",
        minHeight: 200,
      }}
    >
      <Sneakbar
        messageSneack={messageSneack}
        horizontal={horizontal}
        vertical={vertical}
        openSneack={openSneack}
        onClickOfSneack={handleClickSneack}
        handleCloseSneackBar={handleCloseSneackBar}
      />
      <AlertDialog
        open={openDialog}
        handleClose={handleCloseDialoge}
        clickDelete={clickDelete}
        idTodo={idTodo}
      />
      {/*   */}

      <ModalOfInputs
        open={openModal}
        kindOfModal={kindOfModal}
        handleClose={handleClose}
        value={value}
        titleValue={title}
        detailsValue={details}
        onChangeTitle={setTitle}
        onChangeDetails={setDetails}
        onSubmit={handleAdd}
        handleBtnEdite={handleBtnEdite}
      />
      
      {/* mooooodal */}

      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="#"
          variant="fullWidth"
          aria-label="action tabs example"
         sx={{color:"#5C8374",'& .MuiTabs-indicator': {
          backgroundColor: '#5C8374'}}}
        >
          <Tab label="All todos" {...a11yProps(0)} />
          <Tab label="Completed " {...a11yProps(1)} />
          <Tab label="Uncompleted" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel
          sx={{ minHeight: "300px", maxHeight: "300px" }}
          value={value}
          index={0}
          dir={theme.direction}
        >
          {todo.length === 0 ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "200px",
                color: "lightgray",
              }}
            >
              <h2>You have no todo here !!</h2>
            </div>
          ) : (
            todo.map((item) => {
              return (
                <TodoBar
                  key={item.id}
                  title={item.title}
                  details={item.details}
                  isDone={item.isDone}
                  id={item.id}
                  handleStatus={handleStatus}
                  handleClickOpenDialoge={handleClickOpenDialoge}
                  handleEdite={handleEdite}
                />
              );
            })
          )}

          <Zoom
            in={value === 0}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${value === 0 ? transitionDuration.exit : 0}ms`,
            }}
            unmountOnExit
          >
            <Fab
              sx={fabs[0].sx}
              aria-label={fabs[0].label}
              color={fabs[0].color}
              onClick={handleOpenAddModal}
            >
              {fabs[0].icon}
            </Fab>
          </Zoom>
        </TabPanel>

        <TabPanel
          sx={{ minHeight: "300px", maxHeight: "300px", position: "relative" }}
          value={value}
          index={1}
          dir={theme.direction}
        >
          {doneTodo.length === 0 ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "200px",
                color: "lightgray",
              }}
            >
              <h2>You have no todo here !!</h2>
            </div>
          ) : (
            doneTodo.map((item) => {
              return (
                <TodoBar
                  key={item.id}
                  title={item.title}
                  details={item.details}
                  isDone={item.isDone}
                  id={item.id}
                  handleStatus={handleStatus}
                  clickDelete={clickDelete}
                />
              );
            })
          )}
          <Zoom
            in={value === 1}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${value === 0 ? transitionDuration.exit : 0}ms`,
            }}
            unmountOnExit
          >
            <Fab
              sx={fabs[0].sx}
              aria-label={fabs[0].label}
              color={fabs[0].color}
              onClick={handleOpenAddModal}
            >
              {fabs[0].icon}
            </Fab>
          </Zoom>
        </TabPanel>
        {/* tab Pannel of unCompleted */}
        <TabPanel
          sx={{ minHeight: "300px", maxHeight: "300px", position: "relative" }}
          value={value}
          index={2}
          dir={theme.direction}
        >
          {notDoneTodo.length === 0 ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                height: "200px",
                color: "lightgray",
              }}
            >
              <h2>You have no todo here !!</h2>
            </div>
          ) : (
            notDoneTodo.map((item) => {
              return (
                <TodoBar
                  key={item.id}
                  title={item.title}
                  details={item.details}
                  isDone={item.isDone}
                  id={item.id}
                  handleStatus={handleStatus}
                  clickDelete={clickDelete}
                />
              );
            })
          )}
          <Zoom
            in={value === 2}
            timeout={transitionDuration}
            style={{
              transitionDelay: `${value === 0 ? transitionDuration.exit : 0}ms`,
            }}
            unmountOnExit
          >
            <Fab
              sx={fabs[0].sx}
              aria-label={fabs[0].label}
              // color={fabs[0].color}
              onClick={handleOpenAddModal}
            >
              {fabs[0].icon}
            </Fab>
          </Zoom>
        </TabPanel>
      </SwipeableViews>
    </Box>
  );
}

// TOdO and edite a todo
// ! incha allah
