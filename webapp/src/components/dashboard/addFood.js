import React from 'react';
import UploadFile from './uploadFile';
import * as firebase from 'firebase';
import { TextField, Box, Button, NativeSelect} from '@material-ui/core';

export default class AddDish extends React.Component
{
  
  constructor(props)
  {
    super(props);
    this.state = {
      shopName:props.shopName,
      available:"",//true,
      veg:"v",
      category:"",//"pasta",
      cost:0, //145,
      desc:"",//"Wow",
      image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAjVBMVEUAAAD///8BAQH7+/v+/v79/f38/PwUFBRlZWXm5ub29vbp6eny8vLb29vs7Ozi4uIuLi64uLjJycmJiYl1dXVPT0/V1dXd3d3AwMAvLy9YWFhpaWmDg4Ojo6N6enqwsLAbGxuZmZlEREQmJiZSUlI3NzdISEimpqZcXFyGhoYRERE8PDyUlJQaGhq8vLy9pAtyAAASW0lEQVR4nN1dCXeqPBBNKlhBXBBF60bV1va1ff3/P+9jSSArSSAg7+OctlRvkrmZSSbLEACUXY78pgm2BmKCNS8aoE/xx/Ibp7qxgbWcnRxbMHRchHPZG8d1uBsOy0NMsFCC1cpOjc0ZuuPiY2dc3aAcxi5zM7aNdTgsVGBNioZOxtAdFR87o5GDb1CCEcpijCBwxGLdOqwjwY5ZbG3RJlhGzNRWQVYT+qWYEZRhOaFFldGIICtmarOgtNyBEWyj7bLoTHcAd672CTYSWoblitYTE5beYmgaVBatLyb2h8Mm2MhEERY0J1jblWmbqA62hQYRw/7aYHnVtUGLJooY9mWi/uy0PkwO59PMLwcjHZso8vjjXghujzeAr9txKyVoxU2U2Nzjl4OhLk10dMyYPZUcwXHUqZtAWNbj2yEowk6XGT9E8Cm/WU47dhNoOEp6/O4I+l8UweLvV8COpiy3wQJCePzuCMI9VhxBEIA9lORrS4M5tvL42inN/eCKIohvAFj1QLDy+MYpDdzEmm2DSJVr2GUbRFjQOKXBUG3DtcHiZtNlG8RjDGCYstFQbQOEBFOGXZto6fHNU5oMtjMr5U0UZFbatYk6mT9MPX63BMdZTyPQYNbTdGyiLvL4HRNMsVchwSuUmqglgrnHx8uKnc7opwITBcBzum2DtMfveMI7ewVsb/Maw27bIMKCXgimWjwwJnqYSgnaMtECAqwQVE+BXBh/EgQ/Y7z63a2JYoY9raq5R0TwmP7XsZsosWjNu2MTxdgDaouHzv1gRbBY8+6JIMST/FvnfhBD3MLju60Iai9DwC2eNoEtlGAta3BceHynFUGDddEj7k7zhtiDieYLUKA3gvCH8Bc/QqEtm2iRHfb43WsQngmHeO5yqEZnB1oRNFkKhMGmmhgGPbRBBAFtCBpoMIPEpceP+2iDqGjQH8GsL0VDmhnspw1C1uN3tfmCHK7/hTz+lw+hSmhbBMld7s78IBz5wWL1m5yeUW/6fEp+Y8/38ffdEUQz4EYE1SaaIfxFfDpPvonVfOL6uk7Op3iRKdTthiDa5XY6IQjhYhe93QhC3IIiHsO9RbtFJwRHlMe32waDZI1Nkl27EDN9XocBtL7DkEGwx7elwWxeFEfvnOJqCJY3L1E8skqQ9PiWCLrQWZ2XAssU3bAfZNfyvHLSjC0SRAxtbWFvo5up4jjILdpyRbcYcBUM7bRBP3lRSS/evuBU+RKOrBFEa94WTNSLKllNCIqxX5GH7aKViUri2hoQnOGltIaKE6jyMGtPUBLXZt4GZ3vALYe2Y5r/3c/aTnrEcW3GGiz4mUivjd0XemxKMP+Gi2szI+jCab6xJOz6ZdIrlUxks542IEhh2bg2M4JwHImVAa63xopjING4nbsGBinZNujA3ZNI+lu0S961pFdBiux3eH+skZhAPyXrM+F2z4qW/rqfPJgsdaXXYgr2zMDcREw6rs0oJTyxEgHwmo1HwnJC0a4Nkn9PjcWk4tpMdA+9DVvT4OU3Tbb6xv+2bYMUdlNFUJmIqY5rkxL8AIwg4C1OP56+lfzaeXwe+wGxdAYEKY9vonu/HMLg8jcrzNtgNqHw+NRNOsgZmYpJx7WZpIyrnqQQYLnLvvDutvoWMeQlNiVIenwT3SelApEAlzRZ0fO0HKqpsAkURMYoJj3lLrd+1eANFizIZ9oJuHA0aSm9VmWcHbmYkuE1oP7TIBjsMUGA6zUjOFsKJbLTBonGuA+0TRRRAoYE5y+0Bu9ejg27VBzdGOeGCw+yuDZJyi0AlEQ/hTf9sSO9HnYLDQg6srg2iQZXjLntisRnbaEt9DYoLFXPRKVxbZKUO5rgu5cTHE9U6lEqzgibV6weQZfa5VabaEUwr+A3vyB47UVxFGSnZ6L0LreaYEgTXBf27X5bll6hweIm1F+AF8S1SXT/C6jRflQQHL+pJFLIShHUx/5C3S0UPq5N2cnkNX1BRvApLL8bxRHYsrtR7xFxcW0S3c/EBPetpW9cGTMdE4V8XJtEgwsRQbcjNyGDMNiFFkE2rk02VFsK2qBbTBL7cxNMHSwDR72Nyca1yVrvRtCLukX4dr9ugvrmLl3qLQmycW2y/ndCEfxEWM9UItvtFUxUBOldbrkG8ZJTUdz3GGFvXajHTJXiBSoiVsKh4tpkBFcVvzTTrynCrhsqw2pHu1IHg1RxbTITDcoN+TzTGGHDzqXXwf4NXAXBKq5NuuB4pwh+IOy0C+llkLreBmlIHs4DVAQvAJeS/Tpg7N5y198UCy4KgjiuTUowLvPMMr35CJs8VHHUzayeIHV6i2Dh16e35mOUMhhCG0Q37yMBQfEut2AUC/9Qxf3gqjk82k2QNxGUh7Wq4tqcmMrrHWubXcygb+TfdNReYygjyMa1caNYuKRqbwZRyisnWu+KI27AUtYGR5THFxG8UKVEmGCiEavWvgcxqIyLsA3Su9yimaQzpfJa+ri94robTm8zFZkotcst3tVYU3mGeN2g8pDdmF2D7Nb8DJDe5RbPJGOqlDdMMBiK4sib1I1JCEri2nIHcyUzxw/yVCrsvAcxwV6hjGBNXNsuzwLlkA3XiiyCm7Q4paw6XX8zLL9IjAkWHl+42PFCahCgQLoR3t4egOKoopdCDdbGtYVkFuBPCVkqi7MuvRY2FAaRuvK4NuedyCLvjnPdo+lwbz2IfsW9uILDEevi2n6phnAsjXsjKUVRfkOsSXvF3owNA5bFtd2pUjxMkFp9erziyK4Cz4VZzyeJa6PX8A8l5KcH6Ztlx552o4prKzfr8xxmuGrcWx9mp58dhd2LNCiLa1tQBK9lylWPZmeuZE+gQUlcGzPxDcuqOfdoduYVF6ni2qrNb5/K4tnHKf1XWxNDGaRVxX353NhFHNc2LmJHyqyOZdWUa8PDcBPsB5mxMd2KS+1yl4sdqJ/BKWN8PgB+VnlYboJgvGcJCuPa0kbpUVl8Y4JOOfXtuQfRx3qCfpONa8umyicq5QXiRhtrlWJVehlEgj1xGuTi2vK1gA2ZFZ4YOuyyzWAUR9xseIJMXBtx5BEmeCtbLz7taWiKI2+m3EYNHddWrOacyCxSI8UE/QdLr1P0iT24iI5rQ8tVdyJPFPKQ657Z1FbKatb1m2Cl3+DhN0GQjGtDBEdUFs9V//szVMWR1JlY8LHo9JYdro885bnqf98e14PoV8aO8Xyi01vW1HN2YUkwuD1aeh3smgue4U5vge9UVlNB8OwQZvSyb95JgmRcWxVhs6ASXJ1yUBoC/Zp+YHtduMK4tmrRHzdDlKA6nbIM0R+yxwc4upaNayN2NdDoGidIylO5iijEQbfB/DqzRsnFtdHxojE+vHHs3yyU331XheYXNXFtefRMmfI5QH5l5Pr6pTxUybnIdFybQ8W1eWSCtGdCBMdZgOlDexDtoj1FXBsVRpJHISIrTopPDIS2jNXNLiR3gwVxbRGVICkIZv3vZdCKIyA/sCIoims7UJVFjIGOQ5BeB3uAFEEurq08eiVPsKg62k0P0ssgRtgXSBFk49ociiAgPMlfIM2zRaOx314BqzM6rs2d0gnIqbJG+cPoaOekBtm3kjEnb19h5VfUtTeANphDVrAmrg2tBXONduxOVZmbmZ0GpDGW3A2m1rxz75FQCX7KjhZFYT7G7AyxCRfXBiuC+YJh1WhPmOBY8uRBP2ZXD+GwF1htd2cdCL2NvyZTFg6/GCLsupPIdmWs6e1uQGoQplMkMuVvSbAIzVAKPYTN0vx5kIpgFddW6PJOTeRXJcEsHrEvs2tp8WhFUbLLXS7SFFlsq2F6TcRlj9JrFf1OUwKkBp3yxO0igVcN00/qk66G4vFvFEHmrWTwmUowd8oVOJ14PcvUm1bTM7fLjePaske8nqiUaIafKffSnURNsbKivyD1Et3iHSX+3PO8xcKb03nNvOJaLKZ/hiG9DvYpSJmk19zPDyTJPP5sAsiL73/5b/hSlBAzrH52NSepTeKipzkx5Q/O7JpiQT4qAwzBAfcgjbAnCKaDk95u0VMQSbKQ5dkO23kb5G4i8AJMauTxZmdYdM5vUBLZrrjsflgS2S46G4kbbAv+K4ojsXeAD8/7F6XXgXyA8d9hSWQZ+3cMuDUmpazAgJcZVj87bWycjdpi/MD9/+96jtEMOHl7ff7/Xa9vCZ4B4/XE/+MleStZV+98MXg1DR913+j1UK4ork3zmP1GBIXPkImE1sFqiOlqvpWsP4KiomUa1BJTGNfWHUFtExVVRiOCwri2lm1Q+4TC7tugJK6tlQbzy58uFlO8ryo/csPMRBu0Qcl5ba0IBqufSbkZfvv8SWZz/Ooqg07GpA1C3IvITBQx9H1c5fyFVx6VBIOwWrGrZmcvk2O4LZdd7bZB/3d9OM+kBKu4tuT99fby/n29bt4+J4fzMbqckvD3d7daxfFs6wXlG8ToiyY4j54JfsxY9PV63AWaBPVN9PSaZ54oCDog1BrgPb0u369vn4d1VgGnjx0kDoNLMy4WeziCT0QOr392ZV3VnicDtQhOv3GJ8zqCmT9c1sxv5NfSKwWBMPwCwtkEl93bZebXajDwZnHseZnCHZnQOcFVle8KyttgvstdqclkzgI2JcHifHad6VJeNevfKVZlRTD7u1j92b8WyK/7IdlKCObSJ0S+cd3roRzTc0oI6bc5wXH+xm2zOTH4vswoidJmHK7J92Dl130nNVGSIPB5F0wSJAKBDGf0+QFUcHTRwdIE82sdTotmOfKS47MYew8coYlSR8VNoMxEcVybssolsmYhb4uT9IQFdb7gNjkfjxOyD2ZvlnMRwR2VS1zbXkuGDZZXfqLJty62tvuREnzC8a10G1xQqe8qglBfIqVoHaxhPQWc0FmYNiHDSkXQsStRA4L12Ckn9IbqnSf1bTD3+IZuwri9tsruK2B9ZkTnsqjXYL7LXVPc45dOz6zQK5pgpCCo6/Eftgr+HDg1BJ/Aa72Jorg2I4L9qvLZY4LS2fMoV/UaZD2+uawdb1+sffo1D8GBwZ51CEo9/iN3ufPfnzNIm+gHi331teblFiSyrfb0up7mlNBpC+Tf8rLTWg5Se3wlL9tu4n7eeYxWYLDmsQe9pSNHVdMavGwpLrW79Smec9MlFyZfgkS+1hKj2OM/oA2mqrvkawCOyxKE870oUaJFcCAe//uQSGcI0P0Q5rLXW5JVeXylrC3ba/rztQ69crFVQHB2F+cyhWoNotNbWIL9+ff09s9qBKv1Q/r13unl/a4l2a20CBant7SQvlV7fX47Sd9MmYo6ii+fZU2w2T0tRK98kuwayCWSfdPIinnse5TMvPz8wjGz8AtH25MsHjS/2cz1Nch6/B6HagXN/Z8w9mmCs59rfb5HaEKQ9vgPcRMpzz8hWpCB8wvxXjfxTViN5jQIOsPx+OswmP9STU+IvXpGO3dO4Q/tdP2t2mtFrB57dMz2aSmP/w8EOGWPKZltRAs9/uMnhjLIdW5K8MEe37QyIqg1XeLeSsYVp5T1Qe11B5tosPKHQ1Ucpr6cNiT4OI9vUhlo/6VRgIfDlCIrv5EVW8KmE5CEIaivQTQD7t/sDLDpYIB9Q64+QZfy+P2vqulgwdGDjQmOh+/xr0m7KDKH8vhKXlR7vd3+Vmk7aoNn/AaZNiF1lYiGZheP/GC+XSWX6JPYgreo5NdTAPEud5uYwUYEs5ttFZiaTnpW4c/nizBoqEl7TX/2xekW5ibKYRtLtGW2eLLMt6vw+In3vptVXH7dIo/Kt1kbbLvLPRO8IjP/O55vw2hN8jTsPPehT1dcCxNts8s9q6IC2Vmnm388/b2sywm7dsWBaAEZy2hHsLHHL05urbWT/JqukvO9OppJwfQTnwloy0QVa95iN4FEnWmXkl5eHEaHK6dK+jDNzUc6/7Mbed1il5s8fbeeYLUL5M+938u54kld15MHqdhSGwSLuDb8ngfD3iY/vM8sTBkbbxCHH9Hkm3gW6fNjzmAtPhwAFqDRlRhqkN4tQUqdbuM4XuGBizLqvpagNNgYQO84Mb7Wq+YEuc0XtlO2/HgHfhrB/OrvyZdWBPF5bVw18gPCBz5WYD5UqwjWvJXMtJTunnxRalBeNH1em2WCdp98afiIVd1byepT/httkD6vzTJBkydfOnITsP6tZP9MG1SKKXsrmf022LuJlh4//29MKVaYsoSMx/pYDuJWEFdVtMsX3UBM9Owank1xNy4+N5K44bA8RIoda2RnUrQSi06kQ5/yN0510wLSFdbRwQLxx8ryu8NCc2wt5D+jYln3jWvvIAAAAABJRU5ErkJggg==",
      name:""//"spl. pasta",
    }
    
  }

  updateURL(url){
    this.setState({
      image:url
    })
  }

  addFood = ()=>{
    const db = firebase.database();
    db.ref(this.state.shopName+'/food').push({
      "available":this.state.available,
      "category":this.state.category,
      "cost":this.state.cost,
      "desc":this.state.desc,
      "image":this.state.image,
      "name":this.state.name,
      "rating":{"count":0,"rate":0},
      "veg":this.state.veg,

    }).then((val)=>{
      this.setState({
        fid:val.key
      });
    })
  }  

  handleChange = (event) => {
    switch(event.target.id){
      case "name": this.setState({name: event.target.value}); break;
      case "desc": this.setState({desc: event.target.value}); break;
      case "category": this.setState({category: event.target.value}); break;
      case "cost": this.setState({cost: event.target.value}); break;
      case "veg": this.setState({veg: event.target.value}); break;
      case "available": this.setState({available: event.target.value}); break;
    }
  }
  handleSubmit = (event) => {
    this.addFood();
    event.preventDefault();
  }

  render() {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" marginTop="2.5%">
          <TextField id="name" onChange={this.handleChange} label="Name" variant="outlined" color="secondary" style={{width: "30%"}}/><br/>
          <TextField id="desc" onChange={this.handleChange} label="Description" variant="outlined" color="secondary" style={{width: "30%"}}/><br/>
          <TextField id="category" onChange={this.handleChange} label="Category" variant="outlined" color="secondary" style={{width: "30%"}}/><br/>
          <TextField id="cost" onChange={this.handleChange} label="Cost" variant="outlined" color="secondary" style={{width: "30%"}}/><br/>
          <TextField id="available" onChange={this.handleChange} label="Availability Time" variant="outlined" color="secondary" style={{width: "30%"}}/><br/>
          <NativeSelect
            defaultValue={30}
            inputProps={{
              name: 'name',
              id: 'uncontrolled-native',
            }}
            id="veg"
            onChange={this.handleChange}
          >
            <option value="v">Veg</option>
            <option value="nv">Non-Veg</option>
          </NativeSelect><br/>
          <br/>
          <UploadFile shopName="shop1" fid={this.state.fid} updateURL={this.updateURL.bind(this)}/>
          <br/><br/>
          <Button onClick={this.handleSubmit} variant="contained" color="primary" style={{width: "20%"}}>Add Dish</Button>
      </Box>
    );
  }
}


