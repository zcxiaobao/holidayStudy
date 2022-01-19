## 文章信息
Non-intrusive load monitoring algorithm based on features of V–I trajectory

## 摘要
The variation in the overall apparent power was used as the criterion of event detection, and the delta of the V–I trajectory was extracted by smoothing and interpolation.

smoothing and interpolation 滤波和插值
overall apparent power [总视在功率](https://baike.baidu.com/item/%E8%A7%86%E5%9C%A8%E5%8A%9F%E7%8E%87/1016909)

视在功率是表示交流电器设备容量的量。等于电压有效值和电流有效值的乘积。它乘以功率因数等于有功功率。

以总视在功率的变化作为事件检测的准则，通过平滑(滤波)和插值提取V-I轨迹的delta值。

Then, **ten V–I trajectory features** were quantified based on physical significance, which accurately represented those appliances that had multiple built-in modes with distinct power consumption profiles. Finally, the support vector machine multi-classification algorithm was employed for load recognition. We tested the proposed algorithm on both the REDD database and laboratory data. The numerical results demonstrate that the algorithm has higher accuracy than the algorithm using other load features.

根据物理意义量化10个V-I轨迹特征，准确表征具有多个内置模式、不同功耗剖面的设备

采用支持向量机多分类算法进行负载识别

## introduction 
作者通过平稳小波变换(stationary wavelet transformation, SWT)对稳态电流波形进行变换，然后利用Burg谱识别出SWT分解的每一级谱的最大值，从而得到电流波形的特征。

the author transformed the steady-state current waveform via stationary wavelet transformation (SWT) and then used the Burg spectrum to identify the maxima at each level of the spectrum of the SWT decomposition to obtain the features of the current waveform

 小波变换和S变换 wavelet transform and S-transform

通过计算V-I轨迹特征，可以得到高次谐波特性、电压电流相位差、电器导通特性，具体见参考文献。(第23 - 25)。

The results demonstrated that trajectory features yielded higher classification accuracy than the traditional current eigenvector approach. 结果表明，轨迹特征比传统的特征向量方法具有更高的分类精度。


The main aspects of this paper are as follows: (1) proposing a V–I trajectory extraction approach based on the steady-state data before and after an event. The number of trajectory features is expanded, and ten trajectory feature quantization approaches are presented. (2) The algorithm is tested with the data in both the REDD database and laboratory data, and the results are compared with other algorithms that select the transient waveform and variation of the active power and the active and reactive power (PQ) in both the time and wavelet domains as load features.

主要研究内容如下:(1)提出了一种基于事件前后稳态数据的V-I轨迹提取方法。扩展了轨迹特征的数量，提出了10种轨迹特征量化方法。(2)算法测试与数据在REDD数据库和实验室数据,和结果与其他算法进行比较,选择瞬态波形和有功功率的变化,主动和无功功率(PQ)在时间与负荷特征和小波域。

## Event detection
The apparent power continues to change during the appliance state transition.

检测前后的视在功率判断事件发生。
> 未理解
## V–I trajectory features

### Trajectory extraction
1. 在仪表采样频率受限制且原始数据含有噪声的情况下，对电流和电压数据进行处理

插值 平滑窗口

